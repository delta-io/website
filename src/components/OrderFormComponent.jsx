import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px 100px;
`;

export const OrderFormComponent = () => {
  const formRef = useRef(null);
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://my.amplifier.com/tools/campaigns/lib/2.0/amplifier.campaigns.js";
    script1.type = "text/javascript";

    const contentScript2 = `amplifier.campaigns.init({
            //By default links to the page hosting this form would look like this: https://mydomain.com/form?offer_code=<offerCode>
            //If you want to change how the offer code is included in the link just change the following line accordingly
            offerCode: location.search.split('offer_code=')[1],
            load: function (offer) {
                //Called when the offer loads successfully
                /*
                {
                    offer_code: string,
                    status: string [PendingNotification, NotificationFailure, Active, Redeemed, Revoked, Expired]
                    email: string,
                    name: string,
                    created_at: date,
                    notified_at: date,
                    expires_at: date,
                    revoked_at: date,
                    redeemed_at: date,
                    order_id: uuid/guid
                }
                */
            },
            loadError: function(err) {
                //Called when the offer fails to load
                var message = err.message;

                for (var i=0; i<err.errors.length; i++)
                {
                    message += err.errors[i].message + "\\n";
                }

                alert(message);
            },
            items: function () {
                //Function that returns an array of selected SKUs: [{ sku: 'ABC-001' }]
                return amplifier.campaigns.defaultItemSelector();
            },
            shippingAddress: function () {
                //Function that returns the shipping address data where all fields are required except where noted:
                /*
                {
                    name: '',
                    email: '',
                    address1: '',
                    address2: '', //optional
                    city: '',
                    state: '',
                    country_code: '',
                    postal_code: '',
                    phone: '' //optional
                }
                */
                return amplifier.campaigns.defaultShippingAddressSelector();
            },
            success: function() {

                //When an offer is redeemed successfully you can customize the response here
                alert("Offer redeemed successfully");
                //Or you can use a redirect page, i.e:
                //window.location.href = "https://mydomain.com/form/success";

            },
            error: function(err) {
                //If there is an issue submitting the request you can customize the response here
                var message = "We are unable to redeem your offer at this time";

                if (err.message) {
                    message += ": " + err.message;
                }

                for (var i=0; i<err.errors.length; i++)
                {
                    message += err.errors[i].message + "\\n";
                }

                alert(message);
            }
        });`;

    const script2 = document.createElement("script");

    script2.innerHTML = contentScript2;

    document.head.append(script1);

    script1.onload = () => {
      document.head.append(script2);

      script2.onload = () => {
        formRef.current.onsubmit = "return amplifier.campaigns.onSubmit()";
      };
    };

    // eslint-disable-next-line no-restricted-globals
    return () => location.reload();
  }, []);

  return (
    <Wrapper>
      <form ref={formRef} method="post">
        <h2>Select Reward</h2>
        <label>
          <input type="radio" name="item" value="SPARK-ON-ACID-ASPH-S" />
          Spark On Acid T-Shirt (Men&#39;s) - Asphalt - S (Qty: 1)
        </label>
        <h2>Shipping Address</h2>
        <label>Name</label> <br />
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
        <select id="state" name="state" data-value="shortcode" required />
        <br />
        <label>Country</label>
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
    </Wrapper>
  );
};
