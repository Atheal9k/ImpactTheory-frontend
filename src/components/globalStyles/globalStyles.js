import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    html {
        height:100%;
    }
    body {
        display:flex;
        flex-direction: column;
        height: 100%;
        line-height:1.6;
        background: white;
        
    }
    * {
        box-sizing: border-box;
        padding:0;
        margin:0;
        font-family: 'Montserrat', sans-serif;
    }
`;
