import React from 'react';
import './FiltersPanel.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { capitalize } from '../../utils';

import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './components'

import ITEM_SCHEMA from '../../items.json';

class FiltersPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.globalFilters.type.current.toLowerCase()
    };
  }

  _getFilterComponent = (filter, filterPool) => {
    const tempVal = filterPool[filter.filterName];
    const val = tempVal ? tempVal.current : filter.defaultOption;
    let prompt;

    if (filter.filterType == 'dropdown') {
      prompt = (
        <Dropdown
          options={['All'].concat(filter.filterOptions)}
          value={val}
          className="dropdown-prompt"
          onChange={filter.filterName == 'type' ? (target) => this.setState({type: target.value}) : () => {}} />
      );
    } else if (filter.filterType == 'number') {
      const domain = [filter.filterOptions[0], filter.filterOptions[1]];
      const reversed = false;
      const sliderStyle = {
        position: 'relative',
        width: '100%'
      }
      const range = val.split(',');
      const values = [Number(range[0]), Number(range[1])];

      prompt = (
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
          <Ticks count={4}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      )
    }

    return (
      <div className="filter-item">
        <div className="filter-item-label">
          {filter.filterName}
        </div>
        <div className="filter-item-prompt">
          {prompt}
        </div>
      </div>
    );
  }

  render() {
    const type = capitalize(this.state.type);

    const globalPrompts = ITEM_SCHEMA.globalFilters.map(f => this._getFilterComponent(f, this.props.globalFilters));
    const localPrompts = type === 'All' || !(type in ITEM_SCHEMA.categories) ? [] : ITEM_SCHEMA.categories[type].localFilters.map(f => this._getFilterComponent(f, this.props.localFilters));

    return (
      <div id="filters">
        <div className="filter-section-title">
          Global Filters
        </div>
        <div id="global-filters">
          {globalPrompts}
        </div>
        {localPrompts.length > 0 &&
          <div className="filter-section-title">
            Filters for {type}
          </div>}
        {localPrompts.length > 0 &&
          <div id="local-filters">
            {localPrompts}
          </div>}
      </div>
    );
  }
}

export default FiltersPanel;
