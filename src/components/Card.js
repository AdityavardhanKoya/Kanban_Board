import React from 'react';
import './Card.css';

function Card({ ticket, user }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          {user?.name[0]}
          <span className={`status-dot ${user?.available ? 'available' : 'away'}`}></span>
        </div>
      </div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-footer">
        <div className="priority-tag">
          {ticket.priority === 4 && '🔴'}
          {ticket.priority === 3 && '🟠'}
          {ticket.priority === 2 && '🟡'}
          {ticket.priority === 1 && '🔵'}
          {ticket.priority === 0 && '⚪'}
        </div>
        <div className="feature-tag">
          {ticket.tag.join(', ')}
        </div>
      </div>
    </div>
  );
}

export default Card;