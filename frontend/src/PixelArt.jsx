import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { Box, Container, VStack } from "@chakra-ui/react";

const RocketOrbit = () => {
  const canvasRef = useRef(null);
  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.8;
  let rocketImg, earthImg, moonImg, sunImg;

  // Sun as the center of rotation
  const sun = { x: width / 2, y: height / 2 };

  // Earth parameters
  const earthG = 3; // Gravity affecting Earth from the Sun
  const earth = {
    x: sun.x + 250,
    y: sun.y,
    vx: 0,
    vy: Math.sqrt(earthG),
  };

  // Moon parameters
  const moonG = 3; // Gravity affecting Moon from Earth
  const moon = {
    x: earth.x + 80,
    y: earth.y,
    vx: 0,
    vy: Math.sqrt(moonG / 80) * 4,
  };

  // Rocket parameters
  const rocketG = 6.5; // Gravity affecting Rocket from Earth
  const rocket = {
    x: earth.x,
    y: earth.y - 200,
    vx: 2,
    vy: Math.sqrt(rocketG),
    ax: 0,
    ay: 0,
    thrust: false,
    left: false,
    right: false,
    up: false,
    down: false,
  };

  useEffect(() => {
    const sketch = (p) => {
      p.preload = () => {
        rocketImg = p.loadImage("img/rocket.png");
        earthImg = p.loadImage("img/earth.png");
        moonImg = p.loadImage("img/moon.png");
        sunImg = p.loadImage("img/sun.png");
      };

      p.setup = () => {
        const canvas = p.createCanvas(width, height);
        canvas.parent(canvasRef.current);
        p.frameRate(60);
      };

      p.draw = () => {
        p.background(0);

        // Draw Sun
        let sunSize = 150;
        p.imageMode(p.CENTER);
        p.image(sunImg, sun.x, sun.y, sunSize, sunSize);

        // Constrain rocket within screen bounds
        rocket.x = p.constrain(rocket.x, 0, width);
        rocket.y = p.constrain(rocket.y, 0, height);

        // Compute gravity on Earth from Sun
        let earthDx = sun.x - earth.x;
        let earthDy = sun.y - earth.y;
        let earthDistance = p.dist(earth.x, earth.y, sun.x, sun.y);
        let earthForce = earthG / (earthDistance * earthDistance);
        earth.vx += earthForce * earthDx;
        earth.vy += earthForce * earthDy;
        earth.x += earth.vx;
        earth.y += earth.vy;
        p.image(earthImg, earth.x, earth.y, 100, 100);

        // Compute gravity on Moon from Earth
        let moonDx = earth.x - moon.x;
        let moonDy = earth.y - moon.y;
        let moonDistance = p.dist(moon.x, moon.y, earth.x, earth.y);
        let moonForce = moonG / (moonDistance * moonDistance);
        moon.vx += moonForce * moonDx;
        moon.vy += moonForce * moonDy;
        moon.x += moon.vx;
        moon.y += moon.vy;
        p.image(moonImg, moon.x, moon.y, 50, 50);

        // Apply manual controls
        let thrustPower = 0.1;
        if (rocket.left) rocket.vx -= thrustPower;
        if (rocket.right) rocket.vx += thrustPower;
        if (rocket.up) rocket.vy -= thrustPower;
        if (rocket.down) rocket.vy += thrustPower;

        // Compute gravity on Rocket from Earth
        let rocketDx = earth.x - rocket.x;
        let rocketDy = earth.y - rocket.y;
        let rocketDistance = p.dist(rocket.x, rocket.y, earth.x, earth.y);
        let rocketForce = rocketG / (rocketDistance * rocketDistance);
        rocket.ax = rocketForce * rocketDx;
        rocket.ay = rocketForce * rocketDy;

        // Update rocket velocity and position
        rocket.vx += rocket.ax;
        rocket.vy += rocket.ay;
        rocket.x += rocket.vx;
        rocket.y += rocket.vy;

        // Draw rocket image with rotation
        let angle = p.atan2(rocket.vy, rocket.vx);
        p.push();
        p.translate(rocket.x, rocket.y);
        p.rotate(angle + p.HALF_PI);
        p.image(rocketImg, 0, 0, 50, 50);
        p.pop();
      };

      p.keyPressed = () => {
        if (p.keyCode === p.LEFT_ARROW) rocket.left = true;
        if (p.keyCode === p.RIGHT_ARROW) rocket.right = true;
        if (p.keyCode === p.UP_ARROW) rocket.up = true;
        if (p.keyCode === p.DOWN_ARROW) rocket.down = true;
      };

      p.keyReleased = () => {
        if (p.keyCode === p.LEFT_ARROW) rocket.left = false;
        if (p.keyCode === p.RIGHT_ARROW) rocket.right = false;
        if (p.keyCode === p.UP_ARROW) rocket.up = false;
        if (p.keyCode === p.DOWN_ARROW) rocket.down = false;
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, []);

  return (
    <Container centerContent maxW="100vw" py={5}>
      <VStack spacing={4} w="full">
        <Box ref={canvasRef} p={3} />
      </VStack>
    </Container>
  );
};

export default RocketOrbit;
