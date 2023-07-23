import { useState, useEffect } from 'react'
import AxiosInterceptors from '../../Components/Api/AxiosInterceptors';
import BottomErrorCard from '../../Components/Common/BottomErrorCard';
import ApiHeader from '../../Components/Api/ApiHeader';
import { RotatingLines } from "react-loader-spinner";
import ApiList from '../../Components/Api/ApiList';

const products = [
  {
    id: 1,
    name: 'Nike Air Force 1 07 LV8',
    href: '#',
    price: '₹47,199',
    originalPrice: '₹48,900',
    discount: '5% Off',
    color: 'Orange',
    size: '8 UK',
    imageSrc:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBESERAQEBUXExAQFxISFRYVExARFRgWFhUVFxUYHCggGBolHRUTITEhJSkrLi4uFx81OjMtNygtLisBCgoKDg0OGhAQGi8lICU3Mi4uLSsvLSstLystKystKzAwLS0uLS0rLS0tLTctLS0tLS0tNS03Ky0vKy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQYBB//EAEYQAAIBAgEGCAsFBQkBAAAAAAABAgMRIQQFEhNRkgYxQWGBkaLRFBUiMlJTYnGhscFDcoLC4TNCY9LwByM0RIOTsuLxJP/EABsBAQACAwEBAAAAAAAAAAAAAAABAgMEBQYH/8QAOhEAAgECAgcDCwMDBQAAAAAAAAECAxEEIQUSFDFRYZFBofATFVJTcYGSsbLB0RYiMmKC4UKiwtLx/9oADAMBAAIRAxEAPwDsgAfNz0gAAAAAAAAAAAAAAAAAB4ACAAAAAAAAAAAAAAAAAAAAAAegAkAAAAAAAAAAAAAAAAAAHgAIAAAAAAAAAAAAAAAAAAAAAB6ACQAAAAAAAAAAAAAAAAeNkc8pprjqQXvkl9Qs9w3EgKks55OuOvR3495DPPmSr7aHRd/JGVYas90JP2Rf4KOpBb5LqbEGolwkyVfaN+6E+4jnwqyZcWul7or6tGVaPxT3UpdGijxFJf6l1RuwaKnwrydySca0F6UkrL3pNs3VKpGaUotSTxTTun0mOvha1C3lYtX8b93uLQqwqfxdzMAGAyAAAAAAAAAAAAHoAJAAAAAAAAAAAAAAABQznmijlC8uPlcSnHCS6eVczOQzpmCrQu7ayHpxXEvajye/iO+B0sHpXEYb9qd48G33cO9crmrWwlOrm1Z8V9+Pz5nysHY8Jcz0FSqV0tXKMXN6PmzezR5G3hdbeU4ulVjLifRyo9Zg8bDFQ14XyyafY/k/G45NahKlKzMwDySurYr3cZtmI9Leb841aDvTlbbF4xl719eMyoxyeaSelk80raXlVKM3tknecHzpyXsojyvIqlKzklovzakWpU5/dmsH7uNcqRSUYzTjNXT7GE2ndbzsM1cI6VW0Z/3U9jfkyfNLk9z+Juj5YbfNWfq1CyvrIehJ8S9mXJ8jz2M0En+7DP8Atf2f2fVI6NHH2yqdfyvx0O8BRzbnajlC8iVpcsJYSXRyrnRePOVKcqcnCas12M6UZKSvF3QABQsAAAAAAegAkAAAAAAAA2eZKMZaelFO2ha6vbzr/JGxhMO8RWjSTs3fuTf2MdaoqcHN9n5sawG/1uT+xs8zl6hrcn/h7n6Hb/TlT1i6M5/nWlw70aAG/wBbk/8AD3P0Gtyf+HufoR+nKvrF0Y860uHejQA3+tyf+HufoNbk/wDD3P0H6cq+sXRjzrS4d6PnXD/KNDJNDlqVIQ/DG838YxXSfOE2sVgfd+EuaMjy2g6UpRg76UKkIeVCauk7WxWLTXLzOzXxzPmYK+RyaqR0oXsqsLunLZjbyXzOzO3gME8JR8m3fNu/RfJI0q+JjWndezeivRy3kl1r6ouRkmrp3NOYzrSgrxbT4jcMRuyxkmWVKV9CVk/Og0pQmvahK6l0o5Z5ZUf78vkYPKJv9+W8wDs7UKvF/wDNPY9KVCXueM6fTpLniQVsiqwaUoSxV015UZLbGUbqS50zlKNOVWcaabvOUYK93jJpL5n32UFGjRjHBJTilzJ2Rzcfj9kStHWbTe+26UVwe/W7jYw9Dy3bb/xv7d58vp5FXunGlWusU1CV0+ZpHT5ozhlatGtk1Wa9PRtJe9Oyl8/edEDgYrS+0x1alKL4Zu69jyt4udKlg/Ju8Zvx1PEz0A4xuAAAAAAHoAJAAAANjmzN0a0ZNzcbPiVsML3fN3E2QZphUpqbk8b4R4lzYrjNjkubYU1NJt6Ss8eTmsuc7WC0ZNyjOpFOLW5vist3joaNfFRScYuz9hy7Nvwf+0/B+YqZ0yONGSUZN3xts6i3wf8AtPwfmMei6U6WkIQnvWtf4JFsXNTwzlHc7fUjT1ZNTlb0pfNklOsnx4ENfz5fel82YnvWkzxSk4sugorKJRw5OdN/FE0a7fKtyZVxZlU0ywCHWvatyZ7GsuW/RGXcRYtclPJRTTTSaeDTxTXuMdcva3Zdw1q9rdl3CwuaDOXAzI613GDoS20naO48OqxzGcv7O8o+xrUqi2TUqb+Gkj6NrV7W7LuPVUT27sl9CuqjJGtJdp8fr8Cc4x/y+nzwnTfzlcgjwRzg/wDK1OmUF85H2kEaiMm0S4I+fcGeAGVUqlLKso1dOEJKSpqWnOUsbXt5MUnZ8beHEfQ8optUaTwtep8X+hcyz/DQ98fqZZfFeD0vwPrTueX0vDXr1P6YL6r/AGO7gpWpQfGX/H/JpgAeZOqAAAAAAAAAegAkAv5FmqdWOlfRWNr4t2KNKm5SUVxtq3vZ1OQZM6UFFy0ljbC1r4tcZ0tG4NYib103Fc7Z9bv3e/nq4qt5OK1Xn9vka+jmWcZJ61KzTwTvgbTLKLnCUVLRb5Sa5qctzs6c3FQUrWx0tvI8DuOlhsHSd1aMsn/J9nv57jQU6teatm17OJSyvNM6cXPS0rYu172285Nwf+0/B+YiyrPEqkHFRUb4N3u/cS8H/tPwfmOdgVh1pGls97fu3336k+Oe7fzNmv5TZpeU35fUuGRpa/ny+9L5sxMq/ny+9L5sxPcHjHvIanH+rXyMU+ftSJJJ/wBNr6GOi/6k+4AkhW29enMl0ltW/MraL/qT7jKLktu8+4q48C6nxJ7rat+oNJbVv1BCTe3ffcSaEuf/AHH3FTJvI7rat+oZU2rrFb838HgZaEuf/cfcewjK+P8Azb+FiCSUAEElrOlZQySDd7aUVh0miedotWbm1sssOi5teEX+Ch9+P5zj7o8zpWhCeIu+CXuuz2WiKUZ4ZN8fsjc+M6eyfV/2HjOnsn1f9jTXQujmbHS59TqeQgbnxpT9vqX8xapzUkmuJpM5Sq/Lj0fM6jJP2cPuw+RrYvDwpRTj2mGrTUVkSgA0TCAAAAAAexq6DUrpaLUrviVibOOdaVZxlpwVlZrTi1e7d078/wADXZ1/YVPuSOWo8R0sJSdWjOOtk2rrms0/HIy0sNGo9dvNHXeE0/WU99HvhNP06e+jlCXJPPj7y60ZBf6u5Gw8Mkr3Opi01dO62o3HB/7T8H5jlKOUVoU4zcKerVk1d6zQvbT2dB1XB5/tP9P8xbRdNwx9P+/uhI5WkIatCXu+pGnr+fL70vmzEyr+fL70vmzE9+eEe8im8eN9a+pjd7X1xMpp35ez9TGz2PsAC72vriLva+uIs9j7As9j7AAu9r64k0K75ZS64dxDZ7H2BZ7H2CGrkp2LSm3+9Leh3GVOTusX1w+iKkbrb2CxRqYq910Qt8MSrRkUk95bABQyGv8A7QsolTzZCUePW0l/zPlfjmvtW6fWeHGTRq5thGTmlrKb8i17+VtPmviOh6eUdj+Qrs3lf3WXvsbMtKRw1qblJZXyvbudih45r7VujxzX2rdL/iOh6eUdj+QeI6Hp5R2P5BsP9Me4r5+h6c/935KtHO1WSk7rBX807TgZltSrSnpycratJYeSmngjl4Zko8SqZQr88MewdfwUzZGhRbjKctJx89p20bpWsltORp3DKlgpScVvila3G/yRv6M0pHE4hU1KTybzvbh2vmbsAHiD0gAAAAPGwCvnKN6NRexP4YnKUeI66c7nM5Zkroy9l8T+j5zraPlZOD3vM3MM7XTMCXJPPXS/gQlzIslclKztdWb49Fd/MdCUlFXbNmbSi7lqM3VjGkuJKGslyJcegudnWcGftf8AT/Oc/k1CNOKjHr5W9rOg4NySdVNr9x9V+9Gro6aeNp23Xl77wlmcXSLvh523ZfUjV1/Pl96XzZidDLNVFtt3xbfnbTzxRQ9rePb66PE7LUv2dTnHBPjSfQeauOxdSOk8UUPa3h4ooe1vDXQ2Spy6nN6uOxdSGrjsXUjpPFFD2t4eKKHtbw10NkqcupzerjsXUhq47F1I6TxRQ9reHiih7W8NdDZKnLqc3q47F1I9UFsXUdH4ooe1vDxRQ9reGuhslTl1NDTqtc6LMJp8RtvFFD2t4LNNHa94q3Fl40Kq4dTUcK43yCC4vKh+Y4PwVek+pH0LhfBLJIwheT1kLJYuyU23gcPqKnq6m4zl4nSFShU1ISSXu++Z6LBaFwOLoqpiI3lu/lJZLkmlvb7Cr4KvSfUh4KvSfUi1qKnq6m4xqKnq6m4zX871/TXSP4Nv9MaJ9B/HP/sVlQSx031I6HMNa9PQ5U+Pbf8A8NNPJ6jX7OpuM2eY4yg56UJRwXnK1+PiNLSWOq4jDuE5J7nlZZ35ZmWjoTAYSTq0I2la38pPJtXyba7DdA8jK56eXMwAAAIqz4iUxnG5aLsyUQEOU5NGokpK9nfjax6CxKNjEzxk1mmZE7bims10VyPefeT0KEYK0VZXv0kpNk6g5eW3FW2N3ezDpMqlOo1By38Xl794nUlbO77z2hQcuZbe42FOmoqyX6nirUV+/wBhjwil6zsyPS4JYHCq6qxcu13XdwXz7jhYnaq7/g0uFmR5S58UV04fAq6utxY++5e8Ipes7L7h4RS9Z2ZdxvbfhfWx+JGrstf0H0KOhW9rr/UONXFtte9ou+EUvWdl9xhXnSkra234GTt+F9bH4kNlr+g+hS0qnpdpd40qnpdqPeSail657jGopeue4x5wwvrY/Ehstb0H0MNKp6Xaj3hSqel2l3meopeue4xqKXrnuMecML62PxIbLW9B9DGKqvid/dJd5loVufrRJRjSi7qs9x4lnwil6zsvuG34X1sfiQ2Wv6D6FLQrc/WibJ9YnaSutt1gT+EUvWdmXcPCKXrOy+4jb8L62PxIbLX9B9DKUU1Zq5QyjJnHFYr4ou+EUvWdmR54RS9Z2ZGljHgMVG0qsU+xpq6/K5PuNjDrFUHlB27VZ+E+aNUCxlap3WhJPjurNJbLX6SueWqQUJON0+ad0/Y/HA7kJa0U7Ne3eAD1K5QsZ0niSmMIWMjDJ3ZRsAAqQAAADB00ZglOwIXTZg0WQXVRltYrAncFsDpotroXRACXVc55qmTrriTdEYJNWzHVvYNZcQYgy0HsGg9g1iTEGWg9g0HsGsDEGWrewy1bGsuJBGCTVM91XONdcRdEQJlSR6oLYRroi6IDNU2TAq5jWMFS2mSR6CjbZW4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL8aEdGPkXWrlNzxwmtK3NxpK3OeyyOK07eVbTjivQ0XdW5pPqNffk+B7d7Wbm007Z01u5cLcN3C93zZi1JcfHj3ci9VyON5YtP+8awwSjZ44nngkY1qcbuV5qLTTX71uplK4be19weIpXuqds09/B3fXde24aku2RcjkWEccXbC3O01farfM9lkMbpaTxaSw5HFSvj7ylpPa9vTtDk9rIVaja3k+/r16LLLi1J+l4/wXoZHGys8HoYtYq6nz+z8jyORxs5aT0fJfJgmm+nFWw2lG5NRymUFZW2+58ReFeg2lOnl17siJQn2MhABomYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k=',
  },
  {
    id: 2,
    name: 'Nike Blazer Low 77 SE',
    href: '#',
    price: '₹1,549',
    originalPrice: '₹2,499',
    discount: '38% off',
    color: 'White',
    leadTime: '3-4 weeks',
    size: '8 UK',
    imageSrc:
      'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    name: 'Nike Air Max 90',
    href: '#',
    price: '₹2219 ',
    originalPrice: '₹999',
    discount: '78% off',
    color: 'Black',
    imageSrc:
      'data:image/jpeg;base64,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',
  },
]

export function CheckoutPage(props) {

  const [loadingPaypal, setLoadingPaypal] = useState(false)

  const { api_initiatePaypalPayment, bearerHeader } = ApiList()
  console.log('course id list at cart...', props?.courseIdList)

  const paytmPayment = async () => {
    console.log("Paypal payment.. initated..")
    setLoadingPaypal(true)
    try {
      const response = await AxiosInterceptors.post(api_initiatePaypalPayment, { "courseId": props?.courseIdList }, ApiHeader());
      const { data } = response;
      window.location.href = data.links[1].href; // Redirect the user to PayPal payment approval URL
      setLoadingPaypal(false)
    } catch (error) {
      setLoadingPaypal(false)
      console.error(error);
      // Handle error
    }
  };

  return (
    <>

      <div className="mx-auto my-4 max-w-4xl md:my-6">
        {/* <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl my-10 ">
          Checkout Page
        </h1> */}
        <div className="overflow-hidden  rounded-xl bg-gray-100">
          <div className="grid grid-cols-12 ">
            {/* Product List */}
            <div className="col-span-12 px-5 py-6 md:px-8">

              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Price ({props?.itemCount} item)</dt>
                      <dd className="text-sm font-medium text-gray-900">₹ {props?.cartSum}</dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">- ₹ {props?.priceDiscount || 0}</dd>
                    </div>

                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                      <dd className="text-lg font-bold text-gray-900">₹ {props?.cartSum - props?.priceDiscount}</dd>
                    </div>
                  </dl>


                </div>
              </section>

              <hr className="mt-6 border-gray-200" />
              <form action="#" className="mt-6">
                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                  <div className="flex-grow">
                    <input
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter coupon code"
                    />
                  </div>
                  <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </form>

              {/* <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between text-gray-600">
                  <p className="text-sm font-medium">Sub total</p>
                  <p className="text-sm font-medium">₹1,14,399</p>
                </li>
                <li className="flex items-center justify-between text-gray-900">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">₹1,14,399</p>
                </li>
              </ul> */}


            </div>
            <div className="col-span-12 space-y-3 px-2 pb-4 font-medium text-green-700">
              {props?.isLoadingChapa ? <div className='w-full flex justify-center items-center bg-indigo-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="25"
                  visible={true}
                /></div>
                : <button
                  onClick={props?.chapaPayment}
                  type="button"
                  className="w-full bg-indigo-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Pay</button>
              }
              {loadingPaypal ? <div className='w-full flex justify-center items-center bg-green-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="25"
                  visible={true}
                /></div>
                : <button
                  onClick={paytmPayment}
                  type="button"
                  className="w-full bg-green-500 px-3 py-2 text-md font-semibold text-white shadow-lg hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >Pay with Paypal</button>
              }


            </div>


          </div>
        </div>
      </div>
    </>
  )
}
