
import React from 'react';

const L = 90;
const R = 7;

const positionsByNumber = {
  '1': [ 
    { h: L/2, v: L/2 }
  ],
  '2': [ 
    { h: L/3, v: L/3 }, 
    { h: 2*L/3, v: 2*L/3 }
  ],
  '3': [ 
    { h: L/4, v: L/4 }, 
    { h: 2*L/4, v: 2*L/4 },
    { h: 3*L/4, v: 3*L/4 },
  ],
  '4': [ 
    { h: L/4, v: L/4 }, 
    { h: L/4, v: 3*L/4 },
    { h: 3*L/4, v: 3*L/4 },
    { h: 3*L/4, v: L/4 },
  ],
  '5': [ 
    { h: L/2, v: L/2 },
    { h: L/4, v: L/4 }, 
    { h: L/4, v: 3*L/4 },
    { h: 3*L/4, v: 3*L/4 },
    { h: 3*L/4, v: L/4 },
  ],
  '6': [ 
    { h: L/3, v: L/4 }, 
    { h: 2*L/3, v: L/4 },
    { h: L/3, v: 2*L/4 }, 
    { h: 2*L/3, v: 2*L/4 }, 
    { h: L/3, v: 3*L/4 }, 
    { h: 2*L/3, v: 3*L/4 },       
  ]
}

const DiceFace = ({ number }) => {
  if (number < 1 || number > 6) {
    return null;
  }
  return (
    <div key={number} style={{ padding: 5 }}>
      <div
        style={{
          width: `${L}px`,
          height: `${L}px`,
          borderRadius: 5,
          background: 'white',
          border: '1px solid black',
          position: 'relative'
        }}
      >
        {positionsByNumber[number].map(({ h, v }) => (
          <div
            style={{
              position: 'absolute',
              top: `${v-R}px`,
              left: `${h-R}px`,
              background: 'darkblue',
              borderRadius: R,
              width: 2*R,
              height: 2*R,
            }}
          >
          </div>
        ))}
      </div>
    </div>
  )
}

export default DiceFace;