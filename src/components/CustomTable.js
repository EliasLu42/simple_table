import '@/styles/CustomTable.css';
import TableInputCell from "./TableInputCell";
import {useState} from "react";

const CustomTable = ({rows, updateTableState, dndSort}) => {
	const [dragRow, setDragRow] = useState(null);

	const updateCellValue = (rowId, cellName, value) => {
		const data = {rowId, cellName, value};

		updateTableState(data);
	};

	function dragStartHandler(e, row) {
		setDragRow(row);
	}

	function dragLeaveHandler(e) {
		e.currentTarget.style.background = '';
	}

	function dragEndHandler(e) {
		e.currentTarget.style.background = '';
	}

	function dragOverHandler(e) {
		e.preventDefault();

		e.currentTarget.style.background = '#C2C1C1FF';
	}

	function dropHandler(e, row) {
		e.preventDefault();
		e.currentTarget.style.background = '';

		dndSort(dragRow, row);
	}

	return (
		<div className="CustomTable">
			{rows.length > 0 &&
				<table>
					<thead>
						<tr>
							<th>№</th>
							<th>Name</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row, i) =>
							<tr
								draggable={true}
								onDragStart={(e) => dragStartHandler(e, row)}
								onDragLeave={(e) => dragLeaveHandler(e)}
								onDragEnd={(e) => dragEndHandler(e)}
								onDragOver={(e) => dragOverHandler(e)}
								onDrop={(e) => dropHandler(e, row)}

								key={row.id}
							>
								<td>{i}</td>

								<TableInputCell rowId={row.id} name="name" value={row.name} handler={updateCellValue}/>
								<TableInputCell rowId={row.id} name="value" value={row.value} handler={updateCellValue}/>
							</tr>
						)}
					</tbody>

				</table>
			}
		</div>
	);
};

export default CustomTable;
