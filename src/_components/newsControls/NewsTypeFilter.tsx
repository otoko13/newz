import React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ENewsType } from '../newsService';

export interface INewsTypeFilterProps {
    filters: string[];
    onFiltersChanged: (types: string[]) => void;
}

const NewsTypeFilter = (props: INewsTypeFilterProps) => {

    function handleChange(event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) {
        if (!item) {
            return;
        }
        const newSelectedItems = [...props.filters];
        if (item && item.selected) {
          // add the option if it's checked
          newSelectedItems.push(item.key as string);
        } else {
          // remove the option if it's unchecked
          const currIndex = newSelectedItems.indexOf(item.key as string);
          if (currIndex > -1) {
            newSelectedItems.splice(currIndex, 1);
          }
        }
        props.onFiltersChanged(newSelectedItems);
    }

    return (
        <Dropdown
            className='NewsTypeFilter'
            placeholder="Select types of articles"
            label="What do you want to see?"
            selectedKeys={props.filters}
            onChange={handleChange}
            multiSelect
            options={[
                { key: ENewsType.Story.toString(), text: 'Stories' },
                { key: ENewsType.Job.toString(), text: 'Jobs' },
                { key: ENewsType.Poll.toString(), text: 'Polls' },
            ]}
            styles={{ dropdown: { width: 200 } }}
        />
    );
}

export default NewsTypeFilter;