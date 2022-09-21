import React,{useState, useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import { Tree } from 'primereact/tree';
import FolderService from './services/folderService';
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider';

const AppMenu = (props) => {

    const [folders,setFolders] = useState([])
    const [loading, setLoading] = useState(true);
    const [selectedKey, setSelectedKey] = useState(null);
    const [showFolderDialog, setShowFolderDialog] = useState(false)
    const [folderName, setFolderName] = useState('')
    const toast = useRef(null);
    const [parentFolderId,setParentFolderId] = useState(null)

    const getFolders = async folderId => {
        const params = {
            parent_folder_id: folderId
        }
        const response = await FolderService.listFolders(params)
        
        const treeNodes = response.data.map(folder => {
            return {
                key: folder._id,
                label: folder.title,
                leaf:false
            }
        })

        setFolders(treeNodes)
        setLoading(false)
    }

    useEffect(() => {
        getFolders(null)
    }, [])

    const folderTreeNodeTemplate = (node, options) => {
        let label = <b>{node.label}</b>;

        return (
            <span className={options.className}>
                {label}
                <Button icon="pi pi-check" className="p-button-rounded p-button-text" aria-label="Submit" onClick={() => {setShowFolderDialog(true); setParentFolderId(node.key)}} />
            </span>
        )
    }

    const loadOnExpand = async (event) => {
        // if (!event.node.children) {
            console.log('Bu tree event',event)
            setLoading(true);
            let node = { ...event.node };
            console.log('Burası tree nin nodu ', node);
            const params = {
                parent_folder_id: node.key
            }
            const response = await FolderService.listFolders(params)
            console.log('child geldi', response)
            const childFolders = response.data.map(folder => {
                return {
                    key: folder._id,
                    label: folder.title,
                    leaf:false
                }
            })
            node.children = childFolders;

            let value = [...folders];
            value[value.findIndex(x => x.key == node.key)] = node;
            console.log('Yeni folderslar', value)
            setFolders(value);
            setLoading(false);
        // }
    }

    const createNewFolder = async () => {
        const params = {
          title: folderName,
          parent_id: parentFolderId
        }
        const response = await FolderService.createFolder(params);
        if (response.error){
          toast.current.show({severity:'error', summary: 'Klasör Oluşturulamadı', detail:'Klasör oluşturulamadı! Lütfen daha sonra tekrar deneyiziniz.', life: 3000});
        } else {
          setFolderName('')
          setShowFolderDialog(false)
          setParentFolderId(null)
          toast.current.show({severity:'success', summary: 'Klasör Oluşturuldu', detail:'Klasör Oluşturuldu', life: 3000});
    
        }
      }

    return (
        <div className="layout-sidebar" onClick={props.onMenuClick}>

            <Toast ref={toast} />
            <Dialog
                header='Add New Folder'
                visible={showFolderDialog}
                onHide={() => setShowFolderDialog(false)}
                breakpoints={{ '960px': '75vw' }}
                style={{ width: '30vw' }}
                
            >
                <hr />
                <br />
                <div>
                <h4>
                    <b>Folder Name</b>
                </h4>
                <InputText
                    type='text'
                    value={folderName}
                    placeholder='Here Folder Name'
                    className='p-inputtext-lg block'
                    style={{ width: '100%' }}
                    onChange={e => setFolderName(e.target.value)}
                />
                </div>
                <br />
                <hr />
                <div>
                <Button
                label='No'
                icon='pi pi-times'
                onClick={() => setShowFolderDialog(false)}
                className=' inputbutton'
                />
                <Button
                label='Add'
                icon='pi pi-check'
                onClick={() => createNewFolder()}
                autoFocus
                />
            </div>
            </Dialog>

            <Link to="/" className="logo">
                <span className="app-name">Winform</span>
            </Link>

            <div className="layout-menu-container">
                <span>FOLDERS</span>
                <Divider />
                <Tree value={folders} nodeTemplate={folderTreeNodeTemplate} onExpand={loadOnExpand} 
                    loading={loading}
                    selectionMode="single" 
                    selectionKeys={selectedKey} 
                    onSelectionChange={e => setSelectedKey(e.value)}
                />
            </div>
        </div>
    );
};

export default AppMenu;
