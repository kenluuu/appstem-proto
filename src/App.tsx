import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Gallery } from './Components';
import { imageItem } from './Interfaces/Interfaces';

import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY

function makeImageData(data: any): Array<Array<imageItem>> {
  const images: Array<Array<imageItem>> = []
  for (let i=0; i<data.length; i++) {
    if (i % 3 === 0) {
      images.push([]);
    }
    let lastRow = images.length - 1;
    const item: imageItem = {
      index: i,
      previewUrl: data[i].previewURL,
      imageUrl: data[i].largeImageURL
    }
    images[lastRow].push(item)
  }
  
  return images
}


function App() {
  	const [images, setImages] = useState<Array<Array<imageItem>>>([]);
  	const [searchTerm, setSearchTerm] = useState<string>('');  

  	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    	setSearchTerm(e.target.value)

  	}
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
		fetchImages(searchTerm)
	}

	const fetchImages = async (searchTerm: string) => {
		const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo`
		try {
			const res = await fetch(url)
			const data = await res.json();
			const images = makeImageData(data.hits)
		setImages(images)
		} catch (error) {
			console.log(error)
		}
	} 


	return (
		<div className="App">
			<input type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange}/>
			<Button onClick={handleClick}>search</Button>
			<Gallery images={images} />
		</div>
	);
}

export default App;
