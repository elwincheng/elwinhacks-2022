import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Canvas from 'react-native-canvas';


const TensorCamera = cameraWithTensors(Camera);

const {width, height} = Dimensions.get('window');

export default function App() {

	const [model, setModel] = useState<cocoSsd.ObjectDetection>();

	//let context = useRef<CanvasRenderingContext2D>; // for drawing 2 shapes

	//let canvas = useRef<Canvas>(); // canvas

	let textureDims = 
		Platform.OS == 'ios'
			? { height: 1920, width: 1080 }
			: { height: 1200, width: 1600 };

	function handleCameraStream(images: any) {
		const loop = async () => {
			const nextImageTensor = images.next().value;
			if (!model || !nextImageTensor)
				throw new Error('No model or image tensor');
			model
				.detect (nextImageTensor)
				.then ( (prediction) => {
				})
				.catch ((error) => {
					console.log(error);
					});
			requestAnimationFrame(loop);
			};
			loop();
		}
		/*
			function drawRectangle(
			predictions: cocossd.Detectedobject[],
			nextImage Tensor: any
			) {
			if (!context.current
			! canvas.current) return;
			}

	async function handleCanvas (can: Canvas) {


	if (can) {
		can.width = width;
		can.height =
		const ctx: CanvasRenderingContext2D =
		ctx.strokeStyle = "red';
		ctx.fillstyle = 'red';
		ctx.lineWidth = 3;
		height;
		can.getContext('2d');
		context.current = ctx;
		canvas.current = can;
	}
	*/

	useEffect(() => {
		(async () => {
		const { status } = await Camera.requestPermissionsAsync();
		await tf.ready();
		setModel(await cocoSsd.load ());
		})();
	}, []);

	return (
		<View style={styles.container}>
			<TensorCamera
				style={styles.camera}
				type={Camera.Constants. Type.back}
				cameraTextureHeight={textureDims.height}
				cameraTextureWidth={textureDims.width}
				resizeHeight={200}
				resizeWidth={152}
				resizeDepth={3}
				onReady={handleCameraStream}
				autorender={true}
				useCustomShadersToResize={false}
			/>
		</View>
);

	/*
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
			<Text>YOOOO</Text>
			<Text>hello</Text>
			<Text>bye</Text>
			<Text>{width}</Text>
			<Text>{height}</Text>
      <StatusBar style="auto" />
    </View>
  );
	*/
}


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

const styles = StyleSheet.create({
	container: {
	flex: 1,
	backgroundColor: '#fff',
	},
	camera: {
		width: '100%',
		height: '100%' ,
	},
	canvas: {
		position: 'absolute',
		zIndex: 10000000,
		width: '100%',
		height: '100%'
	},
});