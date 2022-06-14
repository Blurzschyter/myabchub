import { useState } from 'react';
import { useAppContext } from '../context/appContext';
import { FormRowSelect2, FormRow2, Alert } from '../components';

const AddChannelFormContainer = ({ customRowId }) => {
  const {
    isLoading,
    channelsMapping,
    displayAlert,
    showAlert,
    displayAlertText,
    createNewPoster,
  } = useAppContext();

  const [title, setTitle] = useState('');
  const [productId, setProductId] = useState('');
  const [channelName, setChannelName] = useState('');
  const [ottImgFile, setOttImgFile] = useState('');
  const [atvImgFile, setAtvImgFile] = useState('');

  const [selectedOttImgFile, setSelectedOttImgFile] = useState();
  // const [isOttImgFilePicked, setIsOttImgFilePicked] = useState(false);
  const [selectedAtvImgFile, setSelectedAtvImgFile] = useState();
  // const [isAtvImgFilePicked, setIsAtvImgFilePicked] = useState(false);

  const getObjKey = (obj, value) => {
    return Object.keys(obj).find((key) => obj[key] === value);
  };

  const changeHandlerImageOtt = (event) => {
    setSelectedOttImgFile(event.target.files[0]);
    // setIsOttImgFilePicked(true);
    setOttImgFile(event.target.value);
  };

  const changeHandlerImageAtv = (event) => {
    setSelectedAtvImgFile(event.target.files[0]);
    // setIsAtvImgFilePicked(true);
    setAtvImgFile(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !productId || !channelName || !ottImgFile || !atvImgFile) {
      displayAlert();
      return;
    }
    if (channelName === 'Please select channel') {
      displayAlertText('Please select a specific channel');
      return;
    }

    const bformdata = new FormData();
    bformdata.set('title', title);
    bformdata.set('productId', productId);
    bformdata.set('channelId', getObjKey(channelsMapping, channelName));
    bformdata.append('ottPosterImage', selectedOttImgFile);
    bformdata.append('atvPosterImage', selectedAtvImgFile);
    // console.log(Object.fromEntries(bformdata)); //to console log form FormData()
    createNewPoster(bformdata, customRowId);
  };

  const handleClearForm = () => {
    console.log('handle clear form');
    setTitle('');
    setProductId('');
    setChannelName('');
    setOttImgFile('');
    setAtvImgFile('');
  };

  const channelOptions = Object.values(channelsMapping).sort();

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <section className='card'>
          <header className='card-header'>
            <h2 className='card-title'>Add New Poster</h2>
            {/* <p className='card-subtitle'>
                This is an example of form with multiple block columns.
              </p> */}
          </header>
          <form onSubmit={handleSubmit}>
            <div className='card-body'>
              {showAlert && <Alert />}
              <div className='row form-group pb-3'>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='Poster Title'
                    name='title'
                    value={title}
                    handleChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRow2
                    type='text'
                    labelText='Product ID'
                    name='productId'
                    value={productId}
                    handleChange={(e) => setProductId(e.target.value)}
                  />
                </div>
                <div className='col-lg-4'>
                  <FormRowSelect2
                    labelText='Channel'
                    name='channelName'
                    value={channelName}
                    handleChange={(e) => setChannelName(e.target.value)}
                    list={['Please select channel', ...channelOptions]}
                  />
                </div>
              </div>
              <div className='row form-group pb-3'>
                <div className='col-lg-4'>
                  {/* <FormRow2
                    type='file'
                    labelText='OTT Poster Image'
                    name='ottImgFile'
                    value={ottImgFile}
                    // handleChange={(e) => setOttImgFile(e.target.value)}
                    handleChange={changeHandlerImage}
                  /> */}
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='ottImgFile'>
                      OTT Poster Image
                    </label>
                    <input
                      value={ottImgFile}
                      name='ottImgFile'
                      type='file'
                      onChange={changeHandlerImageOtt}
                      className='form-control'
                      id='formGroupExampleInput'
                      accept='image/*'
                    />
                  </div>
                </div>
                <div className='col-lg-4'>
                  {/* <FormRow2
                    type='file'
                    labelText='ATV Poster Image'
                    name='atvImgFile'
                    value={atvImgFile}
                    handleChange={(e) => setAtvImgFile(e.target.value)}
                  /> */}
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='ottImgFile'>
                      ATV Poster Image
                    </label>
                    <input
                      value={atvImgFile}
                      name='atvImgFile'
                      type='file'
                      onChange={changeHandlerImageAtv}
                      className='form-control'
                      id='formGroupExampleInput'
                      accept='image/*'
                    />
                  </div>
                </div>
              </div>
            </div>
            <footer className='card-footer text-end'>
              <button
                type='submit'
                onClick={handleSubmit}
                disabled={isLoading}
                className='btn btn-primary'
                style={{ marginRight: '5px' }}
              >
                Submit{' '}
              </button>
              <button
                type='reset'
                className='btn btn-default'
                onClick={(e) => {
                  e.preventDefault();
                  handleClearForm();
                }}
              >
                Clear
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};
export default AddChannelFormContainer;
