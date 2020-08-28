import React, { useState, useEffect } from 'react';
import { Gallery, NavBar, Alert } from './Components';
import { imageItem } from './Interfaces/Interfaces';
import { getWords} from './Utilities/Utilities'

function App() {
	const [images, setImages] = useState<Array<imageItem>>();
	const [error, setError] = useState<boolean>(false)
	const errorMsg = "Oh no any error has occurred please try again a later time."
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
			setImages(newImages);
			setError(false);
		} catch (error) {
			setError(true);
		}
	} 
	useEffect(() => {
		getWords()
		fetchImages()
	}, [])
	return (
		<div className="App">
			{error && <Alert bodyMsg={errorMsg} alertProps={{variant:"danger" }}/>}
			<NavBar fetchImages={fetchImages}/>
			<Gallery images={images} />
		</div>
	);
}

export default App;
