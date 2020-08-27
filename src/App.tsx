import React, { useState, useEffect } from 'react';

import { Gallery, NavBar } from './Components';
import { imageItem } from './Interfaces/Interfaces';
import './App.css';


function App() {
	const [images, setImages] = useState<Array<imageItem>>();
	const fetchImages = async (searchTerm: string = '') => {
		const API_KEY = process.env.REACT_APP_API_KEY
		const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo`
		try {
			const res = await fetch(url)
			const data = await res.json();
			const newImages: Array<imageItem> = []
			for (let i=0; i<data.hits.length; i++) {
				newImages.push({index: i, imageUrl: data.hits[i].largeImageURL})
			}
			setImages(newImages)
		} catch (error) {
			console.log(error)
		}
	} 
	useEffect(() => {
		fetchImages()
	}, [])
	return (
		<div className="App">
			<NavBar fetchImages={fetchImages}/>
			<Gallery images={images} />
		</div>
	);
}

export default App;
