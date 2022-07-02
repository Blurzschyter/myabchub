import { useAppContext } from '../context/appContext';

const Alert2 = () => {
  const { alert2Type, alert2Text } = useAppContext();

  return (
    <div
      className={`alert alert-${alert2Type} alert-dismissible fade show`}
      role='alert'
    >
      {alert2Text}
      {/* <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-hidden='true'
        aria-label='Close'
      /> */}
    </div>
  );
};
export default Alert2;
