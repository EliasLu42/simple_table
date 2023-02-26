const TableInputCell = ({rowId, name, value, handler}) => {

	const changeValue = (e) => {
		const newValue = e.currentTarget.value;

		handler(rowId, name, newValue);
	};

	return (
		<td>
			<input value={value} onChange={changeValue}/>
		</td>
	);
};

export default TableInputCell;
