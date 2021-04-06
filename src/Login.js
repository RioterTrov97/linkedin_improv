import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice';
import './Login.css';

function Login() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [profilePic, setProfilePic] = useState('');
	const [isSignup, setIsSignup] = useState(true);
	const dispatch = useDispatch();

	const loginToApp = (e) => {
		e.preventDefault();
		auth.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.displayName,
						profileUrl: userAuth.photoURL,
					})
				);
			})
			.catch((error) => alert(error));
	};

	const register = () => {
		if (!name) {
			return alert('Please enter your full name');
		}

		auth.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
						photoURL: profilePic,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: name,
								photoURL: profilePic,
							})
						);
					});
			})
			.catch((error) => alert(error));
	};

	return (
		<div className="login">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png"
				alt=""
			/>
			<form>
				{/* {isSignUp ? ( */}
				<div className="logins">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Full name (required if registering)"
						type="text"
					/>
					<input
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
						placeholder="Profile pic URL (optional)"
						type="text"
					/>
				</div>
				{/* ) : null} */}

				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					type="password"
				/>
				<button
					type="submit"
					onClick={isSignup ? register : loginToApp}>
					{isSignup ? 'SignUp' : 'SignIn'}
				</button>
			</form>
			<p>
				Not a member?{' '}
				<span
					className="login__register"
					onClick={() => setIsSignup(!isSignup)}>
					{isSignup ? 'SignIn' : 'SignUp'}
				</span>
			</p>
		</div>
	);
}

export default Login;
