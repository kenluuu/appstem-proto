import React, { useState } from 'react'
import { Container, Row, Col, Image, Modal, ModalBody, Carousel, CarouselItem } from 'react-bootstrap';
import { imageItem } from '../Interfaces/Interfaces';
import { makeImageGroup } from '../Utilities/Utilities';
import styled from 'styled-components';


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
	const [modal, setModal] = useState<boolean>(false);
	const [activeIndex, setActiveIndex] = useState<number>(0)
	const imageGroup = makeImageGroup(images)
	const handleOnHide = () => setModal(false)
	const handleImgClick = (selectedIndex: number) => {
		setModal(true)
		setActiveIndex(selectedIndex)
	}
	const handleOnSelect = (selectedIndex: number): void => {
		setActiveIndex(selectedIndex)
	}
	return (
		<Container fluid="sm">
			<Modal 
				show={modal}
				onHide={handleOnHide}
				size="lg"
				
			>
				<ModalBody>
					<Carousel onSelect={handleOnSelect} defaultActiveIndex={activeIndex}>
						{
							images.map((image) => {
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



