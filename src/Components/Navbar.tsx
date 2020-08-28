import React, {useState} from 'react';
import { Navbar, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { spellCheck } from '../Utilities/Utilities';

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
    const [searchTerm, setSearchTerm] = useState('')
    const handleClick = () => {
		if (searchTerm) {
            const checkedTerm = spellCheck(searchTerm);
            setSearchTerm(checkedTerm)
            fetchImages(checkedTerm)   
		}
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }
    return (
        <StyledNavBar fixed="top" bg="dark">
            <StyledInput type="text" placeholder="Search"  value={searchTerm} onChange={handleInputChange} /> 
            <Button onClick={handleClick}>Search</Button>
        </StyledNavBar>
    )
}

export {NavTop}
