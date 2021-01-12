import React, { useEffect, useState } from 'react';
import NavBar from "../components/navbar";
import PDFDown from "../components/pdf_down";
import {GetListService} from "../services/files"; 
import "../styles/global.css";

import firebase from "firebase/app";
import firebaseConfig from "../config/firebase";
import "firebase/storage";

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

export default function App() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		
		GetListService(storageRef).then(storedFiles => {
			console.debug(storedFiles);
			setFiles(storedFiles);
		})
	}, []);

	// <></> is a react fragement
	return (
		<>
			<NavBar />

			<hr className="separation" />
			<div className="centered">
				Decrypted Lecture Notes CS4401 :D, no password
			</div>
			<hr className="separation" />
			<br />
			<div className="link_container">
				<table>
					<tbody>
					{files.map((value, index) => (
						<PDFDown
							name={value.name}
							linkPromise={value.link}
							metaPromise={value.meta}
							key={index}
						/>
					)
					)}
					</tbody>
				</table>
			</div>
		</>
	);
}
