<?php
namespace SureCart\Models;

use SureCart\Models\Traits\HasAutoFeeRules;
use SureCart\Models\Traits\HasDates;
use SureCart\Support\TimeDate;

/**
 * Holds the data of the order bump.
 */
class AutoFee extends Model {
	use HasAutoFeeRules;
	use HasDates;

	/**
	 * Rest API endpoint
	 *
	 * @var string
	 */
	protected $endpoint = 'auto_fees';

	/**
	 * Object name
	 *
	 * @var string
	 */
	protected $object_name = 'auto_fee';

	/**
	 * Get the schedule start date.
	 *
	 * @return string
	 */
	public function getStartAtDateAttribute() {
		return empty( $this->start_at ) ? '' : TimeDate::formatDate( $this->start_at );
	}

	/**
	 * Get the schedule start date and time.
	 *
	 * @return string
	 */
	public function getStartAtDateTimeAttribute() {
		return empty( $this->start_at ) ? '' : TimeDate::formatDateAndTime( $this->start_at );
	}

	/**
	 * Get the schedule end date.
	 *
	 * @return string
	 */
	public function getEndAtDateAttribute() {
		return empty( $this->end_at ) ? '' : TimeDate::formatDate( $this->end_at );
	}

	/**
	 * Get the schedule end date and time.
	 *
	 * @return string
	 */
	public function getEndAtDateTimeAttribute() {
		return empty( $this->end_at ) ? '' : TimeDate::formatDateAndTime( $this->end_at );
	}
}
