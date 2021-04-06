import React, { useState, useEffect } from 'react';
import './Feed.css';

import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import SubcriptionIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

import InputOption from './inputOption';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase';

import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

function Feed() {
	const user = useSelector(selectUser);

	const [input, setInput] = useState('');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
	}, []);

	const sendPost = (e) => {
		e.preventDefault();

		db.collection('posts').add({
			name: user.displayName ? user.displayName : 'Anonymous',
			description: user.email,
			message: input,
			photoUrl: user.photoUrl || user.email[0],
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		setInput('');
	};

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<CreateIcon />
					<form>
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<button type="submit" onClick={sendPost}>
							Send
						</button>
					</form>
				</div>
				<div className="feed__inputOptions">
					<InputOption
						Icon={ImageIcon}
						title="Photo"
						color="#70b5f9"
					/>
					<InputOption
						Icon={SubcriptionIcon}
						title="Video"
						color="#e7a33e"
					/>
					<InputOption
						Icon={EventNoteIcon}
						title="Event"
						color="#c0cbcd"
					/>
					<InputOption
						Icon={CalendarViewDayIcon}
						title="Write article"
						color="#7fc15e"
					/>
				</div>
			</div>

			<FlipMove>
				{posts.map(
					({
						id,
						data: { name, description, message, photoUrl },
					}) => (
						<Post
							key={id}
							name={name}
							description={description}
							message={message}
							photoUrl={photoUrl}
						/>
					)
				)}
			</FlipMove>
		</div>
	);
}

export default Feed;