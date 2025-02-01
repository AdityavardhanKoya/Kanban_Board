import React from 'react';
import Column from './Column';
import './Board.css';

function Board({ tickets, users, grouping, sorting }) {
  const getPriorityLabel = (priority) => {
    const labels = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return labels[priority];
  };

  const groupTickets = () => {
    let grouped = {};
    
    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!grouped[ticket.status]) {
          grouped[ticket.status] = [];
        }
        grouped[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        grouped[user.name] = tickets.filter(ticket => 
          ticket.userId === user.id
        );
      });
    } else if (grouping === 'priority') {
      [0, 1, 2, 3, 4].forEach(priority => {
        grouped[getPriorityLabel(priority)] = tickets.filter(ticket => 
          ticket.priority === priority
        );
      });
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <Column 
          key={group}
          title={group}
          tickets={tickets}
          users={users}
        />
      ))}
    </div>
  );
}

export default Board;
