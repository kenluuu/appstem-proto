import React, { useState } from 'react'
import { Container, Row, Col, Image, Modal, ModalBody, Carousel, CarouselItem } from 'react-bootstrap';
import { imageItem } from '../Interfaces/Interfaces';
import { makeImageGroup } from '../Utilities/Utilities';
import styled from 'styled-components';
import Alert from './Alert';

interface props {
    images: Array<imageItem> 
}

const StyledRow = styled(Row) `
	margin-top: 20px
`

const StyledCol = styled(Col) `
	@media (max-width: 768px) {
		padding: 0px
	}
`

const StyledImage = styled(Image) `
	&:hover {
		cursor: pointer
	}
`

const Gallery: React.FC<props> = (props) => {
	const { images } = props;
	const [galleryState, setGalleryState] = useState({modal: false, activeIndex: 0})
	const imageGroup = makeImageGroup(images)
	const handleOnHide = () => setGalleryState({...galleryState, modal: false});
	const handleImgClick = (selectedIndex: number) => {
		setGalleryState({ modal: true, activeIndex: selectedIndex});
	}
	const handleOnSelect = (selectedIndex: number): void => {
		setGalleryState({ ...galleryState, activeIndex: selectedIndex});
	}
	const zeroMsg = "Sorry, we couldn't find any images for this search."
	return (
		<Container fluid="sm">
			{ images && images.length === 0 && <Alert bodyMsg={zeroMsg} alertProps={{variant:"dark"}}/> }
			<Modal show={galleryState.modal} onHide={handleOnHide} size="lg" centered>
				<ModalBody>
					<Carousel onSelect={handleOnSelect} defaultActiveIndex={galleryState.activeIndex}>
						{
							images && images.map((image) => {
								return (
									<CarouselItem key={image.index}>
										<Image src={image.imageUrl} fluid />
									</CarouselItem>
									
								)
							})
						}
					</Carousel>
				</ModalBody>
			</Modal>
			{
				imageGroup.map((imageRow, rowNum) => {
					return (
						<StyledRow key={rowNum} className="justify-content-start">
							{
								imageRow.map((item: imageItem) => {
									return (
										<StyledCol key={item.index} xs="4" md={{span: 4, offset: 0.5}}>
											<StyledImage src={item.imageUrl} fluid onClick={() => handleImgClick(item.index)} />
										</StyledCol>
									)
								}) 
							}
						</StyledRow>
					)
				})
			}
		</Container>  
	)
}

export default Gallery;



