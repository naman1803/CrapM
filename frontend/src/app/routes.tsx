import { Route, Routes } from 'react-router-dom';
import { App, NotFound } from './screens';
import View from './screens/View';
import DataTable from './screens/DataTable';
import ViewSewage from './screens/ViewSewage';
import ViewAll from './screens/ViewAll';
import ViewLake from './screens/ViewLake';

/**
 * Defines all routes within the app
 */
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/view' element={<View />}>
        <Route index element={<ViewAll />} />
        <Route path='sewage/:sewageId' element={<ViewSewage />} />
        <Route path='lake/:lakeId' element={<ViewLake />} />
      </Route>
      <Route path='/datatable' element={<DataTable />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
