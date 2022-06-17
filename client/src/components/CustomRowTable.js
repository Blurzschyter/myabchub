import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
// import LoadingNew from './LoadingNew';
// import CustomRowTableItem from './CustomRowTableItem';
import { LoadingNew, CustomRowTableItem } from '../components';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Link } from 'react-router-dom';

const CustomRowTable = () => {
  const { isLoading, customRows, getCustomRows, updateRowIndex } =
    useAppContext();
  const [rowList, setRowList] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = ({ active, over }) => {
    // console.log(active, over);
    if (active.id !== over.id) {
      // console.log(rowList);
      // setRowList((rowList) => {
      //   const oldIndex = rowList.findIndex((item) => item._id === active.id);
      //   const newIndex = rowList.findIndex((item) => item._id === over.id);
      //   return arrayMove(rowList, oldIndex, newIndex);
      // });

      const oldIndex = rowList.findIndex((item) => item._id === active.id);
      const newIndex = rowList.findIndex((item) => item._id === over.id);
      const latestData = arrayMove(rowList, oldIndex, newIndex);
      setRowList(latestData);
      console.log(latestData);
      // console.log(`${oldIndex} | ${newIndex}`);
      updateRowIndex(latestData);
    }
  };

  useEffect(() => {
    getCustomRows();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setRowList(customRows);
  }, [customRows]);

  if (isLoading) {
    return <LoadingNew style={{ margin: '0 auto' }} />;
  }

  if (rowList.length === 0) {
    return (
      <div>
        <h4 className='mt-0 mb-0 font-weight-bold text-dark'>
          No dynamic rows list to display
        </h4>
        {/* <p>Block Widgets are perfect to show some statistics.</p> */}
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col'>
        <div className='card card-modern card-modern-table-over-header'>
          <div className='card-header'>
            <div className='card-actions'></div>
            <h2 className='card-title'>Dynamic Row List</h2>
          </div>
          <div className='card-body'>
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <table className='table table-responsive-md table-striped mb-0'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Row</th>
                    <th>apiType</th>
                    <th>Title</th>
                    <th>Total Poster</th>
                    <th>Display Status</th>
                    <th>Created At</th>
                    <th>Last Modified At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <SortableContext
                    items={rowList.map((item) => item._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {rowList.map((item) => {
                      return <CustomRowTableItem key={item._id} {...item} />;
                    })}
                  </SortableContext>
                </tbody>
              </table>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomRowTable;
