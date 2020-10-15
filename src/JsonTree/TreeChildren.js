import React, { useState, memo } from 'react';
import './TreeChildren.scss';

function TreeNode({ id, value }) {

    return (
        <div key={id} className="treeElement">
            {`${id}: ${value}`}
        </div>
    );
}

const ClickableNode = memo(({ id, value }) => {

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {setCollapsed(c => !c)}

    return (
        <div key={id} className={`treeElement clickable${collapsed ? ' collapsed' : ''}`}>
            <div className="arrow" onClick={toggleCollapse}></div>
            {id}
            {!collapsed && <TreeChildren data={value} />}
        </div>
    );
});

const renderItem = (id, value) => {
    if (typeof value === 'object' && value !== null) {
        return <ClickableNode key={id} id={id} value={value} />
    }  else {
        return <TreeNode key={id} id={id} value={value} />
    }
}

const TreeChildren = memo(({ data }) => (
    <div className="treeChildren">
        {Object.entries(data).map(entry => renderItem(...entry))}
    </div>
));

export default TreeChildren;
