import '@/styles/CustomTextarea.css';
import {useState} from 'react';

function checkIsValidJSONFormat(value){
	try {
		JSON.parse(value);
	} catch (e) {
		return false;
	}
	return true;
}

function CustomTextarea({tableStoreJSON, setTableStoreJSON, setTableStoreValues, uploadData}) {
	const [currentValue, setCurrentValue] = useState(tableStoreJSON);
	const [buttonState, setButtonState] = useState('load');
	const [isJSON, setIsJSON] = useState(true);

	const setStoreJSONValue = (value) => {
		setTableStoreJSON(value);
		setCurrentValue(value)
	};

	const handleClick = () => {
		const isJSONStatus = checkIsValidJSONFormat(currentValue);
		setIsJSON(isJSONStatus);

		if(buttonState === 'load' && isJSONStatus){
			setButtonState('upload');
			setTableStoreValues();
		}else if(buttonState === 'upload'){
			setButtonState('load');

			uploadData();
			setCurrentValue(tableStoreJSON);
		}else{
			setButtonState('load');
		}
	};

	return (
		<div className="CustomTextarea">
			<textarea value={tableStoreJSON} onChange={e => setStoreJSONValue(e.currentTarget.value)}/>

			<div className="CustomTextarea_button">
				<button onClick={handleClick}>{ buttonState }</button>
			</div>

			{!isJSON &&
				<div className="CustomTextarea_error">Invalid data format</div>
			}
		</div>
	);
}

export default CustomTextarea;
