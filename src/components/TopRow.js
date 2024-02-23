import React, { useEffect, useState } from "react";
import { useAuthState } from "../context/auth/AuthProvider";
import { Button, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Add, Build, Edit, ExpandCircleDown, ExpandCircleDownOutlined } from "@mui/icons-material";

function TopRow({ shift, screen, cols, dayCount, addRow, edit }) {
	const [{ posts, profile }, dispatch] = useAuthState();
	const [cells, setCells] = useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action) => {
    setAnchorEl(null);
    switch (action) {
      case 'add-row':
        addRow();
        break;
      case 'edit':
        console.log('edit');
        edit();
        break;
      default:
        break;
    }
  };

	useEffect(() => {
		if (cols.length > 0) {
			let obj = {};
			for (const post in posts) {
				if (posts[post].shift === shift.id) {
					if (
						posts[post].date >= cols[0].label &&
						posts[post].date <= cols[6].label &&
						posts[post]?.tag
					) {
						// console.log(posts[post])
						let cellRef = `${posts[post].tag.name}${posts[post].tag.reason}`;
						let cell = { date: posts[post].date, data: posts[post].tag };
						obj[cellRef] = cell;
					}
				}
			}
			setCells(obj);
		}
	}, [posts, cols]);

	const styles = {
		shift: `h-full text-white text-2xl flex justify-between items-center font-semibold p-.01`,
		postTag: `border-x text-center italic w-full`,
	};

	return (
		<tr className={`border-b-2 h-full`}>
			<td className="bg-green sticky left-0">
        <div
          className={styles.shift}
        >
          <h3>{shift.label}</h3>
          { profile.level < 2 && 
          <>
            <IconButton
              variant="solid"
              sx={{ color: "white", padding: 0, marginRight: "5px"}}
              onClick={(e) => {
                // addRow(e);
                handleClick(e);
              }}
              title="Click to open shift menu"
            >
              {/* <Add /> */}
              {/* <Build /> */}
              <ExpandCircleDownOutlined />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleClose('add-row')}>
                <Add /> &nbsp; Add Row
              </MenuItem>
              {edit && 
                <MenuItem onClick={() => handleClose('edit')}>
                  <Edit/> &nbsp; Edit Rotation
                </MenuItem>
              }
              {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
          </>
          }
        </div>
			</td>
			{
				// screen > 500 ?
				cols &&
					cols.map((col) => (
						<td key={col.label}>
							{Object.keys(cells).map((i) => {
								let tag = cells[i];
								if (tag.date === col.label) {
									return (
										<div
											key={tag.data.name + tag.data.reason}
											style={{ backgroundColor: tag.data.color }}
											className={`${styles.postTag} `}
										>
											<p>{`${tag.data.name} - ${tag.data.reason}`}</p>
										</div>
									);
								}
							})}
						</td>
					))
				// :
				// <td className={``}>
				//     {
				//         Object.keys(cells).map(i => {
				//             let tag = cells[i]
				//             if (tag.date === cols[dayCount].label) {
				//                 return (
				//                 <div
				//                     key={tag.data.name+tag.data.reason}
				//                     style={{backgroundColor: tag.data.color,}}
				//                     className={`${styles.postTag} `}
				//                 >
				//                     <p
				//                     >
				//                     {`${tag.data.name} - ${tag.data.reason}`}
				//                     </p>
				//                 </div>
				//                 )
				//             }
				//         })
				//     }
				// </td>
			}
		</tr>
	);
}

export default TopRow;
