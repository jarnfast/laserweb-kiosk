import React, { ReactElement, FC, MouseEvent } from "react";
import Button from '@mui/material/Button';

// define interface to represent component props
interface Props {
    title: String
}

const Header: FC<Props> = ({ title }): ReactElement => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        console.log("foo click");
      };

    return (
        <>
        <h1>
            h1. Heading {title}
        </h1>
        <Button variant="contained" onClick={handleClick}>Set Step</Button>
        </>
    );
};

export default Header;