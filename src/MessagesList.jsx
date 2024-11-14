import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

function MessagesList({ recipientEmail }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('to', '==', recipientEmail),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [recipientEmail]);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <p>{msg.message}</p>
            <small>{new Date(msg.timestamp?.toDate()).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesList;