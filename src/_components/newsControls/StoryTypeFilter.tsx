import React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { EStoriesType } from '../newsService';

export interface IStoryTypeFilterProps {
    filter: string;
    onFilterChanged: (type: string) => void;
}

const StoryTypeFilter = (props: IStoryTypeFilterProps) => {

    function handleChange(_event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption) {
        if (item) {
            props.onFilterChanged(item.key as string);
        }
    }

    return (
        <Dropdown
            className='StoryTypeFilter'
            selectedKey={props.filter}
            onChange={handleChange}
            options={[
                { key: EStoriesType.New.toString(), text: 'Newest' },
                { key: EStoriesType.Top.toString(), text: 'Top stories' },
                { key: EStoriesType.Best.toString(), text: 'Best stories' },
            ]}
            styles={{ dropdown: { width: 200 } }}
        />
    );
}

export default StoryTypeFilter;