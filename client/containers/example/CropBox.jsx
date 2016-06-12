import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import Slider from 'material-ui/Slider'
import AvatarEditor from '../../components/react-avatar-editor'

export default class CropBoxExample extends React.Component {
	state = {
		open: false,
		image: '',
		scale: 1
	}
	open = () => this.setState({open: true})
	close = () => this.setState({open: false})
	reset = () => this.setState({image: ''})
	changeFile = (e) => {
		let reader = new FileReader()
		let file = e.target.files[0]

    if (!file) return;

    reader.onload = (img) => {
    	this.setState({
    		image: img.target.result
    	})
    }
    reader.readAsDataURL(file)
	}
	changeScale = (e, value) => {
		this.setState({
			scale: value
		})
	}
	render() {
		let { open, image, scale } = this.state
		let actions = [
			<FlatButton label="取消" primary onTouchTap={this.close} />,
			<FlatButton label="重置" primary onTouchTap={this.reset} />,
			<FlatButton label="确认" primary />
		]
		return (
			<div>
				<FlatButton label="Dialog" onTouchTap={this.open} />
				<Dialog
					title="修改头像"
					contentStyle={{maxWidth: 600}}
					autoScrollBodyContent
					actions={actions}
					open={open}
					onRequestClose={this.close}
				>	
					<input
						id="upload-portrait"
						style={{ display: 'none'}}
						type="file" 
						accept="image/*"
						onChange={this.changeFile}
					/>
					<div style={{
						width: 400,
						height: 400,
						margin: '42px auto',
					}}>
						{image ? 
							<AvatarEditor
				        image={image}
				        width={340}
				        height={340}
				        border={30}
				        color={[255, 255, 255, 0.6]} // RGBA 
				        scale={scale}
				        style={{cursor: 'move'}}
				      /> :
				      <label htmlFor="upload-portrait">
				      	<div style={{
				      		boxSizing: 'border-box',
									width: '100%',
									height: '100%',
									border: '2px dashed #00BCD4',
									color: '#00BCD4',
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
			  					alignItems: 'center'
								}}>
				      		<UploadIcon color="#00BCD4" /> 上传图片
				      	</div>
				      </label>
						}
					</div>
					<Slider
						style={{
							width: 400,
							margin: '24px auto'
						}}
						min={1}
						max={3}
						value={scale}
						onChange={this.changeScale}
					/>
				</Dialog>
			</div>
		)
	}
}
