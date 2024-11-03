import { usePaymentRequestById } from '@/hooks/usePaymentRequestById';
import { formatDate } from '@/utils/helpers';

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
      value: formatDate(paymentRequest.paymentPeriodStartDate),
    },
    {
      title: 'End date',
      value: formatDate(paymentRequest.paymentPeriodEndDate),
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
      value: formatDate(paymentRequest.createdAt),
    },
  ];

  return (
    <div className={styles.detailsWrapper}>
      <Details details={DETAILS} />

      <Details details={paymentRequest.comment} stringDetailsHeading="Comment" />
    </div>
  );
};
