import { format } from 'date-fns'


const UserOrderDataRow = ({order}) => {
 
   const {image, name, category, status, price, deadline} = order;
   

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{category}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        
        <span className="font-medium text-gray-800">
  {deadline ? format(new Date(deadline), "MM/dd/yyyy") : "N/A"}
</span>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{status}</p>
      </td>
    </tr>
  )
}

export default UserOrderDataRow
