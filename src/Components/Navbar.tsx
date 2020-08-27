import React, {useRef} from 'react';
import { Navbar, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

interface Props {
    fetchImages: (searchTerm: string) => Promise<void>
}
const StyledNavBar = styled(Navbar) `
    justify-content: center;
`
const StyledInput = styled(FormControl) `
    max-width: 500px;
    margin-right: 10px;
`
const NavTop: React.FC<Props> = (props) => {
    const { fetchImages } = props;
    const inputRef = useRef<HTMLInputElement>(null) 
    const handleClick = () => {
		const searchTerm = inputRef.current?.value;
		if (searchTerm) {
           fetchImages(searchTerm)   
		}
	}
    return (
        <StyledNavBar fixed="top" bg="dark">
            <StyledInput type="text" placeholder="Search" ref={inputRef} /> 
            <Button onClick={handleClick}>Search</Button>
        </StyledNavBar>
    )
}

export {NavTop}
