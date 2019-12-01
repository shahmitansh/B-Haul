import React from 'react';
import './FiltersPanel.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './components'

import ITEM_SCHEMA from '../../items.json';

class FiltersPanel extends React.Component {
  render() {
    const type = this.props.globalFilters.type.current.toLowerCase();

    const globalPrompts = ITEM_SCHEMA.globalFilters.map(filter => {
      const val = this.props.globalFilters[filter.filterName].current;
      if (filter.filterType == 'dropdown') {
        return (
          <div className="filter-item">
            <Dropdown options={filter.filterOptions.concat(['All'])}
                    value={val} />
          </div>
        );
      } else if (filter.filterType == 'number') {
        const domain = [filter.filterOptions[0], filter.filterOptions[1]];
        const reversed = false;
        const sliderStyle = {
          position: 'relative',
          width: '100%',
        }
        const range = val.split(',');
        const values = [Number(range[0]), Number(range[1])];

        return (
          <div className="filter-item">
            <Slider
              mode={2}
              step={1}
              domain={domain}
              reversed={reversed}
              rootStyle={sliderStyle}
              values={values}
            >
              <Rail>
                {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
              </Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map(handle => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={10}>
                {({ ticks }) => (
                  <div className="slider-ticks">
                    {ticks.map(tick => (
                      <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
        )
      }
    })

    const localPrompts = [];

    return (
      <div id="filters">
        <div id="global-filters">
          {globalPrompts}
        </div>
        <div id="local-filters">
          {localPrompts}
        </div>
      </div>
    );
  }
}

export default FiltersPanel;
