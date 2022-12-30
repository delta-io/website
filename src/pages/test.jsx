import React from "react";

export default function Test() {
  return (
    <form>
      <h2>Select Reward</h2>
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-S" />
        Spark On Acid T-Shirt (Men&#39;s) - Asphalt - S (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-M" />
        Spark On Acid T-Shirt (Men&#39;s) - Asphalt - M (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-L" />
        Spark On Acid T-Shirt (Men&#39;s) - Asphalt - L (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-XL" />
        Spark On Acid T-Shirt (Men&#39;s) - Asphalt - XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-2XL" />
        Spark On Acid T-Shirt (Men&#39;s) - Asphalt - 2XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-TRRO-S" />
        Spark On Acid T-Shirt (Men&#39;s) - True Royal - S (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-TRRO-M" />
        Spark On Acid T-Shirt (Men&#39;s) - True Royal - M (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-TRRO-L" />
        Spark On Acid T-Shirt (Men&#39;s) - True Royal - L (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-TRRO-XL" />
        Spark On Acid T-Shirt (Men&#39;s) - True Royal - XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACID-TRRO-2XL" />
        Spark On Acid T-Shirt (Men&#39;s) - True Royal - 2XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-NAVY-S" />
        Spark On Acid T-Shirt (Women&#39;s) - Navy - S (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-NAVY-M" />
        Spark On Acid T-Shirt (Women&#39;s) - Navy - M (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-NAVY-L" />
        Spark On Acid T-Shirt (Women&#39;s) - Navy - L (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-NAVY-XL" />
        Spark On Acid T-Shirt (Women&#39;s) - Navy - XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-NAVY-2XL" />
        Spark On Acid T-Shirt (Women&#39;s) - Navy - 2XL (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-ROBL-S" />
        Spark On Acid T-Shirt (Women&#39;s) - Royal Blue - S (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-ROBL-M" />
        Spark On Acid T-Shirt (Women&#39;s) - Royal Blue - M (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-ROBL-L" />
        Spark On Acid T-Shirt (Women&#39;s) - Royal Blue - L (Qty: 1)
      </label>
      <br />
      <label>
        <input type="radio" name="item" value="SPARK-ON-ACIDW-ROBL-2XL" />
        Spark On Acid T-Shirt (Women&#39;s) - Royal Blue - 2XL (Qty: 1)
      </label>
      <br />
      <input
        type="text"
        name="name"
        placeholder="First and last name"
        required
      />
      <br />
      <label>Email</label>
      <input type="email" name="email" placeholder="Email" />
      <br />
      <label>Address 1</label>
      <input type="text" name="address1" placeholder="Address 1" required />
      <br />
      <label>Address 2</label>
      <input type="text" name="address2" placeholder="Address 2" />
      <br />
      <label>City</label>
      <input type="text" name="city" placeholder="City" required />
      <br />
      <label>State</label>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <select id="state" name="state" data-value="shortcode" required />
      <br />
      <label>Country</label>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <select
        className="crs-country"
        name="country_code"
        data-region-id="state"
        data-default-value="US"
        data-value="shortcode"
        required
      />
      <br />
      <label>Zip</label>
      <input type="text" name="postal_code" placeholder="Zip" required />
      <br />
      <label>Phone</label>
      <input type="text" name="phone" placeholder="Phone" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
