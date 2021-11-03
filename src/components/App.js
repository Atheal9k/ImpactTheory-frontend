import axios from "axios";
import { ethers } from "ethers";
import { signMessage } from "./lib/auth";
import styled from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { useEffect, useState } from "react";

const Hero = styled.header`
  background: url("/images/tomHero.png") no-repeat center center/cover;
  height: 100vh;
  position: sticky;
  background-attachment: fixed;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const CardDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
`;

function App() {
  const [signer, setSigner] = useState(undefined);
  const [cardText, setCardText] = useState("Connect With Metamask");

  useEffect(() => {
    if (signer) {
      setCardText("Connected: Please Sign Message");
    }
  }, [signer]);

  useEffect(() => {}, [cardText]);

  const connect = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch {
      const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
      };
      if (!isMetaMaskInstalled()) {
        alert("MetaMask not found, please visit https://metamask.io/");
      }
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer;
    try {
      signer = await provider.getSigner();

      setSigner(signer);
    } catch {
      return;
    }
    let bundle = await signMessage(signer);
    try {
      await axios.post("http://147.182.182.39/verificationBot/verifyAddress", {
        payload: bundle,
      });

      setCardText("Success! Check Discord to see if you got your role.");
      alert("Success! Check Discord to see if you got your role.");
    } catch {
      setCardText("Failed to verify, please start the process on discord.");
      alert("Failed to verify, please start the process on discord.");
    }
  };

  return (
    <div>
      <GlobalStyles />
      <Hero>
        <CardDiv>
          <div className="ui centered card">
            <div className="content" onClick={connect}>
              <a className="header">
                {cardText}
                <span>
                  {" "}
                  <img
                    src={"/images/metamask-fox.svg"}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    alt="Metamask Logo"
                  />
                </span>
              </a>
            </div>
          </div>
        </CardDiv>
      </Hero>
    </div>
  );
}

export default App;
