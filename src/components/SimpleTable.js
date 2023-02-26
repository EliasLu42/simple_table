import "@styles/SimpleTable.css";
import CustomTextarea from "@/components/CustomTextarea";
import CustomTable from "@/components/CustomTable";
import {useState} from "react";

function SimpleTable() {
	const exampleJSON = '[{"name":"name1", "value":"value1"},{"name":"name2", "value":"value2"},{"name":"name3", "value":"value3"},{"name":"name4", "value":"value4"},{"name":"name5", "value":"value5"}]';

	const [tableStoreJSON, setTableStoreJSON] = useState(exampleJSON);
	const [tableStore, setTableStore] = useState([]);

	const setTableStoreValues = () => {
		const storeData = JSON.parse(tableStoreJSON);

		storeData.map((value, i) => {
			value.id = i;
			value.order = i;

			return value;
		});

		setTableStore(storeData);
	};

	const sortRows = (a, b) => {
		if(a.order > b.order){
			return 1;
		}else{
			return -1;
		}
	}

	const updateTableState = (data) => {
		const currentTableStore = JSON.parse(JSON.stringify(tableStore));

		currentTableStore.map((row) => {
			if(row.id === data.rowId){
				row[data.cellName] = data.value;
			}

			return row;
		});

		setTableStore(currentTableStore);
	};

	const uploadData = () => {
		const currentTableStore = JSON.parse(JSON.stringify(tableStore));

		currentTableStore.map((row) => {
			delete row.id;
			delete row.order;

			return row;
		});

		setTableStoreJSON(JSON.stringify(currentTableStore));
	};

	const dndSort = (dragRow, dropRow) => {
		const currentTableStore = JSON.parse(JSON.stringify(tableStore));

		setTableStore(currentTableStore.map((row) => {
			if(row.id === dropRow.id){
				return {...row, order: dragRow.order}
			}

			if(row.id === dragRow.id){
				return {...row, order: dropRow.order}
			}

			return row;
		}));
	};

	return (
		<div className="SimpleTable">
			<CustomTable rows={tableStore.sort(sortRows)} updateTableState={updateTableState} dndSort={dndSort}/>

			<CustomTextarea tableStoreJSON={tableStoreJSON} setTableStoreJSON={setTableStoreJSON} setTableStoreValues={setTableStoreValues} uploadData={uploadData}/>
		</div>
	);
}

export default SimpleTable;
