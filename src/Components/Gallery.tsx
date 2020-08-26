import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { imageItem } from '../Interfaces/Interfaces';
import styled from 'styled-components';

interface props {
    images: Array<Array<imageItem>>
}

const StyledRow = styled(Row) `
	margin-top: 20px
`

const StyledCol = styled(Col) `
	@media (max-width: 768px) {
		padding: 0px
	}
`
const Gallery: React.FC<props> = (props) => {
	const { images } = props;
	return (
		<Container fluid="sm">
			{
				images.map((imageRow, rowNum) => {
					console.log(imageRow)
					return (
						<StyledRow key={rowNum} className="justify-content-start">
							{
								imageRow.map((item: imageItem) => {
									return (
										<StyledCol key={item.index} xs="4" md={{span: 4, offset: 0.5}}>
											<Image src={item.imageUrl} fluid />
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