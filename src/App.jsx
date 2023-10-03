import React, { useEffect } from 'react';
import { Flex, Button, VStack, Stack, HStack } from '@chakra-ui/react';
import { fabric } from 'fabric';

function App() {
  let canvas;
  let copiedObjects = [];
  let copiedObject = null;

  useEffect(() => {
    canvas = new fabric.Canvas('mainCanvas', {
      selection: true,
    });
  }, []);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 60,
      height: 70,
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: 'green',
      left: 200,
      top: 200,
    });
    canvas.add(circle);
  };

  const addText = () => {
    const text = new fabric.Text('Hello, Think Space!', {
      left: 250,
      top: 250,
      fontSize: 20,
    });
    canvas.add(text);
  };

  const groupObjects = () => {
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length) {
      const group = new fabric.Group(activeObjects);
      canvas.add(group);
    }
  };

  const copy = () => {
    copiedObjects = canvas.getActiveObjects();
    canvas.discardActiveObject();
  };

  const paste = () => {
    if (copiedObjects.length > 0) {
      copiedObjects.forEach((copiedObject) => {
        copiedObject.clone((clonedObj) => {
          canvas.add(clonedObj);
          clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
          });
          clonedObj.setCoords();
          canvas.renderAll();
        });
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'gray' }}>
      <div style={{ marginRight: '20px' }}>
        <button onClick={addRectangle}>Add Rectangle</button><br />
        <button onClick={addCircle}>Add Circle</button><br />
        <button onClick={addText}>Add Text</button><br />
        <button onClick={groupObjects}>Group Selected</button><br />
        <button onClick={copy}>Copy</button><br />
        <button onClick={paste}>Paste</button><br />
      </div>
      <canvas id="mainCanvas" width="800" height="600"></canvas>
    </div>
  );
}

export default App;
