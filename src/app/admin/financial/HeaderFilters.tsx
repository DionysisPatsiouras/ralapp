import { createContext, useContext, useMemo, useState } from 'react';
import { faker } from '@faker-js/faker';

import DataGrid from 'react-data-grid'
import type { Column, RenderHeaderCellProps, Omit } from './types/types'
// import type { Omit } from './folder/types'
import type { Props } from './types/types2'

// const rootClassname = css`
//   display: flex;
//   flex-direction: column;
//   block-size: 100%;
//   gap: 10px;

//   > .rdg {
//     flex: 1;
//   }
// `;


const filterColumnClassName = 'filter-cell';




//creates the row object with properties (id, task, etc)
interface Row {
  id: number;
  task: string;
  priority: string;
  issueType: string;
  developer: string;
  complete: number;
}

//created the 'Filter' object with the 'Row' properties except id && complete
//and adds 2 more (complete and enabled)
interface Filter extends Omit<Row, 'id' | 'complete'> {
  // task: string;
  // priority: string;
  // issueType: string;
  // developer: string;
  complete: number | undefined;
  enabled: boolean;
}

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter loses focus
const FilterContext = createContext<Filter | undefined>(undefined);

// const UserContext = createContext()

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.stopPropagation();
  }
}

function selectStopPropagation(event: React.KeyboardEvent<HTMLSelectElement>) {
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.stopPropagation();
  }
}

//here the main functions occurs
//the direction of the grid 'ltr' or 'rtl'
export default function HeaderFilters({ direction }: Props) {
  const [rows] = useState(createRows);

  //when page loads, autofilters with the filters below
  const [filters, setFilters] = useState(
    (): Filter => ({
      task: '',
      priority: 'Critical',
      issueType: 'All',
      developer: '',
      complete: undefined,
      //open and close the filter bars (Toggle filters Button)
      enabled: true
    })
  );


  //???????????????????????????????????????????????????
  const developerOptions = useMemo(
    () =>
      //array.from converts the set back to an array
      Array.from(new Set(rows.map((r) => r.developer))).map((d) => ({
        label: d,
        value: d
      })),
    [rows]
  );

  //creates all the filter selections
  const columns = useMemo((): readonly Column<Row>[] => {
    return [
      {
        key: 'id',
        name: 'ID',
        width: 50
      },
      {
        key: 'task',
        name: 'Title',
        headerCellClass: filterColumnClassName,
        renderHeaderCell: (p) => (
          <FilterRenderer<Row> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                style={{ 'inlineSize': '100%', 'padding': '4px', 'fontSize': '14px', 'height' : '30px' }}
                value={filters.task}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    task: e.target.value
                  })
                }
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'priority',
        name: 'Priority',
        headerCellClass: filterColumnClassName,
        renderHeaderCell: (p) => (
          <FilterRenderer<Row> {...p}>
            {({ filters, ...rest }) => (
              <select
                {...rest}
                style={{ 'inlineSize': '100%', 'padding': '4px', 'fontSize': '14px', 'height' : '30px' }}
                value={filters.priority}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priority: e.target.value
                  })
                }
                onKeyDown={selectStopPropagation}
              >
                <option value="All">All</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'issueType',
        name: 'Issue Type',
        headerCellClass: filterColumnClassName,
        renderHeaderCell: (p) => (
          <FilterRenderer<Row> {...p} >
            {({ filters, ...rest }) => (
              <select
                {...rest}
                style={{ 'inlineSize': '100%', 'padding': '4px', 'fontSize': '14px', 'height' : '30px' }}
                value={filters.issueType}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    issueType: e.target.value
                  })
                }
                onKeyDown={selectStopPropagation}
              >
                <option value="All">All</option>
                <option value="Bug">Bug</option>
                <option value="Improvement">Improvement</option>
                <option value="Epic">Epic</option>
                <option value="Story">Story</option>
              </select>
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'developer',
        name: 'Developer',
        headerCellClass: filterColumnClassName,
        renderHeaderCell: (p) => (
          <FilterRenderer<Row> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                style={{ 'inlineSize': '100%', 'padding': '4px', 'fontSize': '14px', 'height' : '30px' }}
                value={filters.developer}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    developer: e.target.value
                  })
                }
                onKeyDown={inputStopPropagation}
                list="developers"
              />
            )}
          </FilterRenderer>
        )
      },
      {
        key: 'complete',
        name: '% Complete',
        headerCellClass: filterColumnClassName,
        renderHeaderCell: (p) => (
          <FilterRenderer<Row> {...p}>
            {({ filters, ...rest }) => (
              <input
                {...rest}
                type="number"
                style={{ 'inlineSize': '100%', 'padding': '4px', 'fontSize': '14px', 'height' : '30px' }}
                value={filters.complete}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    complete: Number.isFinite(e.target.valueAsNumber)
                      ? e.target.valueAsNumber
                      : undefined
                  })
                }
                onKeyDown={inputStopPropagation}
              />
            )}
          </FilterRenderer>
        )
      }
    ];
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      return (
        (filters.task ? r.task.includes(filters.task) : true) &&
        (filters.priority !== 'All' ? r.priority === filters.priority : true) &&
        (filters.issueType !== 'All' ? r.issueType === filters.issueType : true) &&
        (filters.developer
          ? r.developer.toLowerCase().startsWith(filters.developer.toLowerCase())
          : true) &&
        (filters.complete !== undefined ? r.complete >= filters.complete : true)
      );
    });
  }, [rows, filters]);


  // clear filters
  function clearFilters() {
    setFilters({
      task: '',
      priority: 'All',
      issueType: 'All',
      developer: '',
      complete: undefined,
      enabled: false
    });
  }

  //toggle filters
  function toggleFilters() {
    setFilters((filters) => ({
      ...filters,
      enabled: !filters.enabled
    }));
  }

  return (
    <div >
      <div>
        <button type="button" className="btn btn-primary" onClick={toggleFilters}>
          {filters.enabled ? 'Απόκρυψη Φίλτρων' : 'Εμφάνιση Φίλτρων'}
        </button>{' '}
        <button type="button" className="btn btn-primary" onClick={clearFilters}>
          Καθαρισμός Φίλτρων
        </button>
        
      </div>
      <br></br>
      <FilterContext.Provider value={filters}>
        <DataGrid
          // className={filters.enabled ? filterContainerClassname : undefined}
          columns={columns}
          rows={filteredRows}
          headerRowHeight={filters.enabled ? 80 : undefined}
          direction={direction}
        />
      </FilterContext.Provider>
      <datalist id="developers">
        {developerOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </datalist>
    </div>
  );
}

function FilterRenderer<R>({
  tabIndex,
  column,
  children
}: RenderHeaderCellProps<R> & {
  children: (args: { tabIndex: number; filters: Filter }) => React.ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  return (
    <div style={{'paddingBlock' : '0', 'paddingInline' : '8px'}}>
      <div>{column.name}</div>
      {filters.enabled && <div>{children({ tabIndex, filters })}</div>}
    </div>
  );
}

//literally feeds the grid with data
function createRows() {
  const rows: Row[] = [];

  for (let i = 1; i < 100; i++) {
    //push fake data
    rows.push({
      id: i,
      task: `Task ${i}`,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor(Math.random() * 4)],
      developer: faker.person.fullName()
    });
  }
  return rows;
}