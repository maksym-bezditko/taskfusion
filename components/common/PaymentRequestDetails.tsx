import moment from 'moment';

import { usePaymentRequestById } from '@/hooks/usePaymentRequestById';

import { Details } from './Details';
import { Loader } from './Loader';
import styles from './PaymentRequestDetails.module.scss';

type Props = {
  paymentRequestId: string;
};

export const PaymentRequestDetails = (props: Props) => {
  const { paymentRequestId } = props;

  const { data: paymentRequest, isLoading: isLoadingProject, isError } = usePaymentRequestById(paymentRequestId);

  if (isLoadingProject || isError || !paymentRequest) {
    return <Loader isSmall />;
  }

  const DETAILS = [
    {
      title: 'Start date',
      value: moment(paymentRequest.paymentPeriodStartDate).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'End date',
      value: moment(paymentRequest.paymentPeriodEndDate).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Status',
      value: paymentRequest.status,
    },
    {
      title: 'Amount',
      value: `$${paymentRequest.usdAmount}`,
    },
    {
      title: 'Created at',
      value: moment(paymentRequest.createdAt).format('MM/DD/YYYY, h:mm a'),
    },
  ];

  return (
    <div className={styles.detailsWrapper}>
      <Details details={DETAILS} />

      <Details details={paymentRequest.comment} stringDetailsHeading="Comment" />
    </div>
  );
};
