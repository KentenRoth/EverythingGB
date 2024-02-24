import React, { useState } from 'react';
import instance from '../axios/axios';

interface Updates {
	email: string;
	password: string;
	confirmPassword: string;
	currentPassword: string;
}

const Settings = () => {
	const [updates, setUpdates] = useState<Updates>({
		email: '',
		password: '',
		confirmPassword: '',
		currentPassword: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setUpdates({ ...updates, [e.target.name]: e.target.value });
	};

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const url = (e.target as HTMLButtonElement).name;
		try {
			const response = await instance.post(`/users/${url}`);
			if (response.status === 200) {
				console.log('Logged out');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdates = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const allUpdates: { [key: string]: string } = {};

			for (const key in updates) {
				if (
					updates[key as keyof Updates] &&
					key !== 'confirmPassword'
				) {
					allUpdates[key] = updates[key as keyof Updates];
				}
			}

			if (updates.password !== updates.confirmPassword) {
				console.log('Passwords do not match');
				return;
			}

			allUpdates.currentPassword = updates.currentPassword;
			const response = await instance.patch('/users/me', allUpdates);
			if (response.status === 200) {
				console.log('Updated');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="settings_wrapper">
			<div className="settings">
				<div className="settings_logout">
					<button onClick={handleLogout} name="logout">
						Logout
					</button>
					<button onClick={handleLogout} name="logoutAll">
						Logout All Accounts
					</button>
				</div>
				<div className="settings_updates">
					<h3>Update Email or Password</h3>
					<form onSubmit={handleUpdates}>
						<input
							name="email"
							type="text"
							placeholder="Email"
							onChange={handleChange}
						/>
						<input
							name="password"
							type="password"
							placeholder="New Password"
							onChange={handleChange}
						/>
						<input
							name="confirmPassword"
							type="password"
							placeholder="Confirm New Password"
							onChange={handleChange}
						/>
						<div className="settings_updates__current-pass">
							<label>Current Password Required</label>
							<input
								name="currentPassword"
								type="password"
								placeholder="Current Password"
								onChange={handleChange}
							/>
						</div>

						<button>Update</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Settings;
