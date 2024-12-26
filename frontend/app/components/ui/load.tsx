import React from 'react';
import styled from 'styled-components';

const Load = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="simple-text">Search Wallet ID!</div>
        <div className="cube">
          <div className="face middle front">
            <div className="cube cube-front">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
          <div className="face middle back">
            <div className="cube cube-back">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
          <div className="face middle left">
            <div className="cube cube-left">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
          <div className="face middle right">
            <div className="cube cube-right">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
          <div className="face middle top">
            <div className="cube cube-top">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
          <div className="face middle bottom">
            <div className="cube cube-bottom">
              <div className="face front" />
              <div className="face back" />
              <div className="face left" />
              <div className="face right" />
              <div className="face top" />
              <div className="face bottom" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`


height: 100vh; /* Full viewport height */
display: flex;
align-items: center;
justify-content: center;

  .loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .simple-text {
    position: absolute;
    top: -100px;
    color: white;
    width: 200px;
    text-align: center;
  }

  .cube {
    position: absolute;
    width: 40px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(45deg);
    transition: 300ms ease;
    cursor: pointer;
    animation: rotateCube 10s infinite linear;
  }
  /* change the distance between cubes with translateX */
  .cube-front,
  .cube-back {
    transform: translateX(40px) translateZ(-20px);
    animation: none;
  }
  /* change the distance between cubes with translateZ */
  .cube-top,
  .cube-bottom {
    transform: translateZ(20px);
    animation: none;
  }
  /* change the distance between cubes with translateX */
  .cube-left,
  .cube-right {
    transform: translateX(40px) translateZ(-20px);
    animation: none;
  }

  .face {
    position: absolute;
    transform-style: preserve-3d;
    width: 40px;
    height: 40px;
    background: rgb(21, 46, 75);
    background: radial-gradient(
      circle,
      rgba(21, 46, 75, 1) 0%,
      rgba(10, 14, 55, 1) 100%
    );
  }

  .front {
    transform: rotateY(0deg) translateZ(20px);
  }

  .back {
    transform: rotateY(180deg) translateZ(20px);
  }

  .left {
    transform: rotateY(-90deg) translateZ(20px);
  }

  .right {
    transform: rotateY(90deg) translateZ(20px);
  }

  .top {
    transform: rotateX(90deg) translateZ(20px);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(20px);
  }

  .cube-back:hover .face,
  .cube-front:hover .face,
  .cube-top:hover .face,
  .cube-bottom:hover .face,
  .cube-left:hover .face,
  .cube-right:hover .face {
    background: rgb(255, 255, 255);
    background: radial-gradient(circle, white 60%, rgb(157, 208, 255) 100%);
    filter: drop-shadow(0px 0px 5px #e7faff)
      drop-shadow(0px 0px 15px rgb(75, 168, 255))
      drop-shadow(0px 0px 30px rgb(50, 156, 255));
  }

  .cube:active {
    transform: translateX(0px) translateZ(-20px);
  }

  .cube-back:active .face,
  .cube-front:active .face,
  .cube-top:active .face,
  .cube-bottom:active .face,
  .cube-left:active .face,
  .cube-right:active .face {
    background: rgb(255, 255, 255);
    background: radial-gradient(circle, white 60%, rgb(157, 208, 255) 100%);
    filter: drop-shadow(0px 0px 5px #e7faff)
      drop-shadow(0px 0px 15px rgb(75, 168, 255))
      drop-shadow(0px 0px 30px rgb(50, 156, 255));
  }

  .middle {
    background: transparent;
  }

  @keyframes rotateCube {
    0% {
      transform: rotateX(-30deg) rotateY(45deg);
    }
    100% {
      transform: rotateX(-30deg) rotateY(405deg);
    }
  }`;

export default Load;
