import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Gallery } from './Components';
import { imageItem } from './Interfaces/Interfaces';

import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  	const [images, setImages] = useState<Array<imageItem>>([]);
	const inputRef = useRef<HTMLInputElement>(null) 
	const handleClick = (): void => {
		const searchTerm = inputRef.current?.value;
		if (searchTerm) {
			fetchImages(searchTerm)
		}
		
	}

	const fetchImages = async (searchTerm: string | null) => {
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

	return (
		<div className="App">
			<input type="text" placeholder="Search" ref={inputRef} />
			<Button onClick={handleClick}>search</Button>
			<Gallery images={images} />
		</div>
	);
}

export default App;
