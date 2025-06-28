"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./Dashboard.module.css";

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetchNotes(1),
  });

  if (isLoading) {
    return (
      <div className={css.dashboard}>
        <div className={css.header}>
          <h2 className={css.title}>📊 Dashboard</h2>
          <button onClick={onClose} className={css.closeBtn}>×</button>
        </div>
        <div className={css.loading}>Loading statistics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={css.dashboard}>
        <div className={css.header}>
          <h2 className={css.title}>📊 Dashboard</h2>
          <button onClick={onClose} className={css.closeBtn}>×</button>
        </div>
        <div className={css.error}>Error loading statistics</div>
      </div>
    );
  }

  const notes = data.notes;
  const totalNotes = notes.length;
  
  // Statistics by tags
  const tagStats = notes.reduce((acc, note) => {
    acc[note.tag] = (acc[note.tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Notes created today
  const today = new Date().toDateString();
  const todayNotes = notes.filter(note => 
    new Date(note.createdAt).toDateString() === today
  ).length;

  // Notes created this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeekNotes = notes.filter(note => 
    new Date(note.createdAt) >= weekAgo
  ).length;

  // Sort tags by popularity
  const sortedTags = Object.entries(tagStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const maxCount = Math.max(...Object.values(tagStats));

  return (
    <div className={css.dashboard}>
      <div className={css.header}>
        <h2 className={css.title}>📊 Dashboard</h2>
        <button onClick={onClose} className={css.closeBtn}>×</button>
      </div>
      
      <div className={css.content}>
        <div className={css.statsGrid}>
          <div className={css.statCard}>
            <div className={css.statNumber}>{totalNotes}</div>
            <div className={css.statLabel}>Total Notes</div>
          </div>
          
          <div className={css.statCard}>
            <div className={css.statNumber}>{todayNotes}</div>
            <div className={css.statLabel}>Created Today</div>
          </div>
          
          <div className={css.statCard}>
            <div className={css.statNumber}>{thisWeekNotes}</div>
            <div className={css.statLabel}>This Week</div>
          </div>
        </div>

        <div className={css.tagsSection}>
          <h3 className={css.sectionTitle}>Statistics by Tags:</h3>
          <div className={css.tagsList}>
            {sortedTags.map(([tag, count]) => (
              <div key={tag} className={css.tagItem}>
                <div className={css.tagInfo}>
                  <span className={css.tagName}>{tag}</span>
                  <span className={css.tagCount}>{count}</span>
                </div>
                <div className={css.tagBar}>
                  <div 
                    className={css.tagBarFill}
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalNotes === 0 && (
          <div className={css.emptyState}>
            <p>📝 No notes yet</p>
            <p>Create your first note to see statistics!</p>
          </div>
        )}
      </div>
    </div>
  );
} 