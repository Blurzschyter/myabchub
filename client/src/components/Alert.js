import { useAppContext } from '../context/appContext';

const Alert = () => {
  const { alertType, alertText } = useAppContext();

  return (
    <div
      className={`alert alert-${alertType} alert-dismissible fade show`}
      role='alert'
    >
      {alertText}
      <button
        type='button'
        className='btn-close'
        data-bs-dismiss='alert'
        aria-hidden='true'
        aria-label='Close'
      />
    </div>
  );
};
export default Alert;
