import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Terminal, CheckCircle, Circle, Loader2, ArrowLeft } from 'lucide-react';
import { mockDb } from '../services/mockDb';
import { supabase } from '../services/supabaseClient';
import { executeWorkflowStep } from '../services/geminiService';
import { WorkflowRun, Workflow } from '../types';

const RunViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [run, setRun] = useState<WorkflowRun | null>(null);
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Poll for run data & Realtime Subscription
  useEffect(() => {
    if (!id) return;

    const fetchRun = async () => {
        const r = await mockDb.getRunById(id);
        if (r) {
            setRun(r);
            const wf = await mockDb.getWorkflowById(r.workflowId);
            if (wf) setWorkflow(wf);
        }
    };
    fetchRun();

    // Supabase Realtime Subscription
    let channel: any;
    if (supabase) {
        channel = supabase.channel(`run-${id}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'workflow_step_runs' }, () => {
                fetchRun(); // Refresh on any step update
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'workflow_runs' }, () => {
                fetchRun(); 
            })
            .subscribe();
    }

    return () => {
        if (channel) supabase!.removeChannel(channel);
    };
  }, [id]);

  // Execution Engine Simulation (Worker)
  useEffect(() => {
    if (!run || !workflow || run.status !== 'running') return;

    const executeNextStep = async () => {
        // Find first pending step
        const nextStepRun = run.stepRuns.find(sr => sr.status === 'pending');
        
        if (!nextStepRun) {
            // All done
            await mockDb.updateRun(run.id, { status: 'completed', finishedAt: Date.now() });
            const r = await mockDb.getRunById(run.id);
            setRun(r || null);
            return;
        }

        // 1. Mark as running
        await mockDb.updateStepRun(run.id, nextStepRun.stepId, { status: 'running', startedAt: Date.now() });
        setRun(await mockDb.getRunById(run.id) || null); // Force update state
        addLog(`> Starting Step: ${workflow.steps.find(s => s.id === nextStepRun.stepId)?.title}...`);

        // 2. Execute (with delay to simulate work)
        const stepDef = workflow.steps.find(s => s.id === nextStepRun.stepId);
        if (stepDef) {
            // Artificial delay for UX
            await new Promise(r => setTimeout(r, 1000));
            const output = await executeWorkflowStep(stepDef);
            
            // 3. Mark success
            await mockDb.updateStepRun(run.id, nextStepRun.stepId, { 
                status: 'completed', 
                finishedAt: Date.now(),
                output: output
            });
            addLog(`> Completed: ${stepDef.title}`);
            addLog(`  Output: ${output.substring(0, 50)}...`);
        }

        // 4. Update local state to trigger next loop
        setRun(await mockDb.getRunById(run.id) || null);
    };

    // Only run this engine if we are in "Demo Mode" (no backend worker) or to simulate it
    // In a real app with Supabase Functions, this hook wouldn't exist here.
    // For this client-side demo, we use a timeout loop.
    const timer = setTimeout(executeNextStep, 500); 
    return () => clearTimeout(timer);
  }, [run, workflow]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  if (!run || !workflow) return <div className="p-8 text-white">Initializing Engine...</div>;

  return (
    <div className="flex flex-col h-full bg-black font-mono">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Link to={`/copilot/workflows/${workflow.id}`} className="text-gray-500 hover:text-white"><ArrowLeft size={18} /></Link>
                <h2 className="text-white font-bold">{workflow.name}</h2>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${run.status === 'running' ? 'bg-yellow-500/20 text-yellow-500 animate-pulse' : 'bg-green-500/20 text-green-500'}`}>
                    {run.status}
                </span>
            </div>
            <div className="text-xs text-gray-500">Run ID: {run.id}</div>
        </div>

        <div className="flex flex-1 overflow-hidden">
            {/* Steps Visualizer */}
            <div className="w-1/3 border-r border-gray-800 p-6 overflow-y-auto bg-gray-900/20">
                <h3 className="text-gray-500 text-xs font-bold uppercase mb-4">Execution Path</h3>
                <div className="space-y-4">
                    {run.stepRuns.map((sr) => {
                        const stepDef = workflow.steps.find(s => s.id === sr.stepId);
                        return (
                            <div key={sr.id} className={`flex items-center gap-3 p-3 rounded border transition-all ${
                                sr.status === 'running' ? 'bg-brand-900/20 border-brand-500/50' :
                                sr.status === 'completed' ? 'bg-green-900/10 border-green-500/20' :
                                'bg-gray-900 border-gray-800 opacity-50'
                            }`}>
                                {sr.status === 'running' && <Loader2 size={16} className="text-brand-400 animate-spin" />}
                                {sr.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                                {sr.status === 'pending' && <Circle size={16} className="text-gray-600" />}
                                
                                <div>
                                    <div className="text-sm font-bold text-gray-300">{stepDef?.title}</div>
                                    {sr.output && <div className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">{sr.output}</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Terminal Logs */}
            <div className="flex-1 bg-black p-6 flex flex-col">
                <div className="flex items-center gap-2 text-gray-500 mb-4 pb-2 border-b border-gray-800">
                    <Terminal size={16} /> <span className="text-xs font-bold uppercase">System Logs</span>
                </div>
                <div ref={scrollRef} className="flex-1 overflow-y-auto font-mono text-sm space-y-2">
                    {logs.map((log, i) => (
                        <div key={i} className="text-green-400/80">{log}</div>
                    ))}
                    {run.status === 'running' && (
                        <div className="text-brand-500 animate-pulse">_</div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default RunViewer;
