import React from 'react';
import { Alert as BaseAlert} from 'react-bootstrap'
import styled from 'styled-components';

interface Props {
    bodyMsg: string,
    alertProps: any
}

const StyledBaseAlert = styled(BaseAlert) `
    margin-top: 120px
`
const P = styled.p `
    text-align: center;
    margin: 0;
`
const Alert: React.FC<Props> = (props) => {
    const { bodyMsg, alertProps } = props;
    return (
        <StyledBaseAlert {...alertProps}>
            <P>{bodyMsg}</P>
        </StyledBaseAlert>
    )
}

export default Alert