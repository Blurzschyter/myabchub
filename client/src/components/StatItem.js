const StatItem = ({ count, title, icon, color, bcg, fas, colorStatus }) => {
  return (
    <div className='col-lg-4'>
      <section
        className={`card card-featured-bottom card-featured-${colorStatus} mb-4`}
      >
        <div className='card-body'>
          <div className='widget-summary'>
            <div className='widget-summary-col widget-summary-col-icon'>
              <div className={`summary-icon bg-${colorStatus}`}>
                <i className={`fas ${fas}`} />
              </div>
            </div>
            <div className='widget-summary-col'>
              <div className='summary'>
                <h4 className='title'>{title}</h4>
                <div className='info'>
                  <strong className='amount'>{count}</strong>
                </div>
              </div>
              <div className='summary-footer'></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default StatItem;
