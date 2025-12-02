
import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import FadeIn from '../components/FadeIn';
import SEO from '../components/SEO';
import { Plus, CheckCircle, X } from 'lucide-react';
import { mockDb, CalendarEvent } from '../services/mockDb';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockDb.getEvents());
  const [addingDate, setAddingDate] = useState<string | null>(null);
  const [newEventTitle, setNewEventTitle] = useState('');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock dates for a visual week view starting from today adjusted to start on Monday or just next 7 days
  const currentWeek = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    // Start list from today
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleAddSubmit = (e: React.FormEvent, dateStr: string) => {
      e.preventDefault();
      if (newEventTitle.trim()) {
        const evt = mockDb.addEvent({ date: dateStr, title: newEventTitle, platform: 'Instagram', status: 'Idea' });
        setEvents([...events, evt]);
        setNewEventTitle('');
        setAddingDate(null);
      }
  };

  const getEventsForDate = (dateStr: string) => {
      return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="pt-16 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <SEO title="Content Calendar" />
      <FadeIn>
        <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-900/20 px-2 py-1 rounded border border-brand-500/20">Suite · Planner</span>
        </div>
        <SectionHeader title="Content Calendar" subtitle="Plan your week. Stay consistent." />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {currentWeek.map((date, i) => {
            const dateStr = date.toISOString().split('T')[0];
            const dayEvents = getEventsForDate(dateStr);
            const isToday = new Date().toDateString() === date.toDateString();
            const isAddingThisDay = addingDate === dateStr;

            return (
                <div key={dateStr} className={`bg-dark-card border ${isToday ? 'border-brand-500 shadow-[0_0_15px_rgba(123,47,247,0.15)]' : 'border-dark-border'} rounded-xl min-h-[300px] flex flex-col p-4 transition-colors`}>
                    <div className="text-center mb-4 border-b border-dark-border pb-2">
                        <span className="text-xs text-gray-500 uppercase font-bold block">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <div className={`text-xl font-bold inline-block px-2 rounded ${isToday ? 'text-white bg-brand-600' : 'text-white'}`}>
                            {date.getDate()}
                        </div>
                    </div>

                    <div className="flex-grow space-y-2">
                        {dayEvents.map(evt => (
                            <div key={evt.id} className="bg-dark-bg p-2 rounded border border-dark-border text-xs group cursor-pointer hover:border-brand-500/50 transition-colors">
                                <div className="font-semibold text-gray-200 mb-1 break-words">{evt.title}</div>
                                <div className="flex justify-between items-center text-gray-500">
                                    <span>{evt.platform}</span>
                                    {evt.status === 'Published' && <CheckCircle size={10} className="text-green-500" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {isAddingThisDay ? (
                        <form onSubmit={(e) => handleAddSubmit(e, dateStr)} className="mt-2">
                            <input 
                                autoFocus
                                value={newEventTitle}
                                onChange={(e) => setNewEventTitle(e.target.value)}
                                placeholder="Idea..."
                                className="w-full text-xs bg-dark-bg border border-brand-500 rounded p-2 text-white focus:outline-none mb-2"
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-brand-600 text-white text-xs py-1 rounded font-bold">Add</button>
                                <button type="button" onClick={() => setAddingDate(null)} className="p-1 text-gray-400 hover:text-white"><X size={14}/></button>
                            </div>
                        </form>
                    ) : (
                        <button 
                            onClick={() => setAddingDate(dateStr)}
                            className="mt-2 w-full py-2 border border-dashed border-gray-700 rounded text-gray-500 hover:text-white hover:border-gray-500 flex items-center justify-center transition-colors"
                        >
                            <Plus size={14} />
                        </button>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default Calendar;
